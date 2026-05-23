#!/usr/bin/env python3
"""Generate gesture-style adverb videos with Gemini/Veo."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_REFERENCE_VIDEO = ROOT / "assets" / "rating-videos" / "52_View.mp4"
DEFAULT_OUTPUT_DIR = ROOT / "generated" / "adverb_gesture_videos"
DEFAULT_DESCRIPTION_MODEL = "gemini-3.1-flash-lite-preview"
DEFAULT_VIDEO_MODEL = "veo-3.1-generate-preview"

ADVERB_PLANS = {
    "only": (
        "The performer communicates exclusivity with one clear full-body gesture. She stands with her weight centered, raises one index finger "
        "straight upward in front of the chest to represent a single option, and uses the other hand as a flat vertical barrier beside it, "
        "as if excluding every other option from the space. The gesture should have one continuous shape: single finger selected, flat hand blocks alternatives, "
        "then a brief hold."
    ),
    "possibly": (
        "The performer communicates uncertainty with one clear full-body gesture. She shifts her weight gently from one foot to the other while holding "
        "one palm upward in front of the body, letting the raised hand tilt slowly left and right like an unstable balance. The torso may subtly follow "
        "the wavering hand, but the face stays neutral. The gesture should be one continuous wavering motion, not a shrug or a sequence of separate signs."
    ),
    "mostly": (
        "The performer communicates a large majority but not totality with one clear full-body gesture. She marks an imagined horizontal scale across "
        "the space in front of her body, then uses one arm and a slight torso lean to sweep across nearly the whole scale from left to right, stopping "
        "before the final edge to leave a small unmarked remainder. The gesture should be one continuous large sweep that clearly means 'almost all, but not all.'"
    ),
    "sometimes": (
        "The performer communicates intermittence with one clear full-body gesture. She traces a short horizontal path in front of her torso with one hand, "
        "then makes three separated light downward taps along that same path, with small pauses between taps. Her body remains available for the timing: "
        "a slight forward pulse may accompany each tap. The whole movement should read as occasional points on a timeline, performed as one unified gesture."
    ),
    "in the future": (
        "The performer communicates future time with one clear full-body gesture. She begins with one hand near the center of the chest to mark the present, "
        "then steps or leans slightly forward while extending that hand in a smooth arc into the space ahead, ending with a steady forward point at arm's length. "
        "The body may move forward with the arm so the concept feels projected ahead in time, but it should remain one continuous forward gesture."
    ),
}


def load_dotenv(path: Path, *, override: bool = False) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if override:
            os.environ[key] = value
        else:
            os.environ.setdefault(key, value)


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")


def wait_until_active(client: Any, uploaded_file: Any, poll_seconds: int) -> Any:
    while not uploaded_file.state or uploaded_file.state.name != "ACTIVE":
        if uploaded_file.state and uploaded_file.state.name == "FAILED":
            raise RuntimeError(f"Gemini failed to process uploaded file: {uploaded_file.name}")
        print(f"Waiting for reference upload processing: {uploaded_file.name}", flush=True)
        time.sleep(poll_seconds)
        uploaded_file = client.files.get(name=uploaded_file.name)
    return uploaded_file


def describe_reference_video(client: Any, types: Any, args: argparse.Namespace) -> str:
    description_path = args.output_dir / "reference_style_description.txt"
    if description_path.exists() and description_path.stat().st_size > 0 and args.skip_existing:
        return description_path.read_text(encoding="utf-8").strip()

    uploaded = client.files.upload(file=args.reference_video)
    uploaded = wait_until_active(client, uploaded, args.poll_seconds)
    prompt = (
        "Describe the visual production style of this gesture-learning video in 5-7 concise sentences. "
        "Focus on camera framing, background, lighting, performer position, gesture pacing, whether speech/text is present, "
        "and the instructional gesture style. Do not focus on identifying the target word."
    )
    response = client.models.generate_content(
        model=args.description_model,
        contents=[uploaded, prompt],
        config=types.GenerateContentConfig(temperature=0),
    )
    description = (response.text or "").strip()
    description_path.write_text(description + "\n", encoding="utf-8")
    return description


def build_prompt(adverb: str, style_description: str) -> str:
    return f"""Create an 8-second gesture-learning video for the adverb "{adverb}".

Match this reference style:
{style_description}

Target concept and gesture action:
{ADVERB_PLANS[adverb]}

Production constraints:
- One adult woman, whole body visible from head to feet at all times, centered in frame.
- Static camera, neutral indoor background, simple even lighting.
- No subtitles, no written words, no labels, no captions, no logos.
- The woman must not speak, mouth words, whisper, sing, or open her mouth as if talking.
- Her face must remain completely neutral: no smiling, frowning, eyebrow acting, surprise, or exaggerated expression.
- The meaning must be conveyed by the body and hands only, not by facial expression.
- She may use her whole body for the gesture, including leaning, stepping, shifting weight, bending, or changing posture when useful.
- The gesture should be clear enough for a second-language vocabulary lesson.
- Use natural human timing: start neutral, perform exactly one continuous gesture, then hold the final pose briefly.
- Keep the motion simple, repeatable, and pedagogically usable rather than theatrical.
- Avoid a chain of different gestures; do not mime a story or combine multiple symbolic actions.
"""


def save_prompts(style_description: str, output_dir: Path) -> dict[str, str]:
    prompts_dir = output_dir / "prompts"
    prompts_dir.mkdir(parents=True, exist_ok=True)
    prompts: dict[str, str] = {}
    for adverb in ADVERB_PLANS:
        prompt = build_prompt(adverb, style_description)
        prompts[adverb] = prompt
        (prompts_dir / f"{slug(adverb)}.txt").write_text(prompt, encoding="utf-8")
    (output_dir / "prompts.json").write_text(json.dumps(prompts, indent=2), encoding="utf-8")
    return prompts


def generate_video(client: Any, types: Any, model: str, prompt: str, output_path: Path, args: argparse.Namespace) -> None:
    if output_path.exists() and output_path.stat().st_size > 0 and args.skip_existing:
        print(f"Skipping existing {output_path}", flush=True)
        return

    operation = client.models.generate_videos(
        model=model,
        prompt=prompt,
        config=types.GenerateVideosConfig(
            number_of_videos=1,
            duration_seconds=8,
            aspect_ratio="16:9",
            resolution=args.resolution,
            negative_prompt=(
                "subtitles, written words, captions, text overlays, logos, multiple people, dramatic scene, "
                "busy background, cuts, montage, talking, audio, music, object close-up, close-up crop, half body, "
                "smiling, frowning, expressive face, speaking mouth, lip movement, multiple gestures, gesture sequence"
            ),
        ),
    )

    while not operation.done:
        print(f"Waiting for Veo operation for {output_path.name}...", flush=True)
        time.sleep(args.video_poll_seconds)
        operation = client.operations.get(operation)

    if not operation.response or not operation.response.generated_videos:
        diagnostic_path = output_path.with_suffix(".operation.json")
        try:
            diagnostic_path.write_text(operation.model_dump_json(indent=2), encoding="utf-8")
        except Exception:
            diagnostic_path.write_text(str(operation), encoding="utf-8")
        raise RuntimeError(f"No generated videos returned for {output_path}")

    generated_video = operation.response.generated_videos[0]
    client.files.download(file=generated_video.video)
    generated_video.video.save(output_path)
    print(f"Wrote {output_path}", flush=True)


def run(args: argparse.Namespace) -> int:
    load_dotenv(ROOT / ".env")
    load_dotenv(ROOT / "env.local", override=True)

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY is not set.", file=sys.stderr)
        return 2

    if not args.reference_video.exists():
        print(f"Reference video not found: {args.reference_video}", file=sys.stderr)
        return 2

    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("Missing dependency: google-genai. Install requirements.txt first.", file=sys.stderr)
        return 2

    args.output_dir.mkdir(parents=True, exist_ok=True)
    videos_dir = args.output_dir / "videos"
    videos_dir.mkdir(parents=True, exist_ok=True)

    client = genai.Client(api_key=api_key)
    style_description = describe_reference_video(client, types, args)
    prompts = save_prompts(style_description, args.output_dir)

    if args.prompts_only:
        print(f"Wrote prompts under {args.output_dir}", flush=True)
        return 0

    for adverb, prompt in prompts.items():
        output_path = videos_dir / f"{slug(adverb)}.mp4"
        print(f"Generating {adverb} -> {output_path}", flush=True)
        generate_video(client, types, args.video_model, prompt, output_path, args)

    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--reference-video", type=Path, default=DEFAULT_REFERENCE_VIDEO)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--description-model", default=DEFAULT_DESCRIPTION_MODEL)
    parser.add_argument("--video-model", default=DEFAULT_VIDEO_MODEL)
    parser.add_argument("--resolution", choices=["720p", "1080p"], default="720p")
    parser.add_argument("--poll-seconds", type=int, default=5)
    parser.add_argument("--video-poll-seconds", type=int, default=10)
    parser.add_argument("--skip-existing", action="store_true")
    parser.add_argument("--prompts-only", action="store_true")
    return parser.parse_args()


if __name__ == "__main__":
    raise SystemExit(run(parse_args()))
