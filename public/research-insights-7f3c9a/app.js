(() => {
  "use strict";

  const COLORS = {
    human: "#172033",
    gemini_pro: "#5f7cff",
    gemini_flash: "#18b9a6",
    qwen: "#f3b846",
  };
  const state = {
    data: null,
    agreementDimension: "iconicity",
    agreementModel: "gemini_pro",
    selectedVideo: null,
    search: "",
    collection: "all",
  };
  const $ = (id) => document.getElementById(id);
  const fmt = (value, digits = 2) => value == null ? "—" : Number(value).toFixed(digits);
  const signed = (value) => value == null ? "—" : `${value >= 0 ? "+" : ""}${Number(value).toFixed(2)}`;
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[char]);

  function modelLabel(key) {
    return state.data.metadata.models.find((model) => model.key === key)?.label || key;
  }

  function dimensionLabel(key) {
    return state.data.dimensions.find((dimension) => dimension.key === key)?.label || key;
  }

  function activeOverall() {
    return state.data.overall.find(
      (row) => row.model_key === state.agreementModel && row.dimension_key === state.agreementDimension,
    );
  }

  function showTooltip(event, html) {
    const tooltip = $("tooltip");
    tooltip.innerHTML = html;
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    tooltip.classList.add("visible");
  }

  function hideTooltip() {
    $("tooltip").classList.remove("visible");
  }

  function populateHeader() {
    const { metadata, overall } = state.data;
    $("humanResponses").textContent = metadata.human_responses.toLocaleString();
    $("humanRaters").textContent = `Across ${metadata.human_raters} pseudonymized raters`;
    $("humanScores").textContent = metadata.human_ratings_total.toLocaleString();
    $("vlmScores").textContent = (metadata.model_videos * metadata.models.length * state.data.dimensions.length).toLocaleString();
    $("heroPaired").textContent = metadata.human_videos;
    const byModel = metadata.models.map((model) => {
      const rows = overall.filter((row) => row.model_key === model.key);
      return { ...model, mae: rows.reduce((sum, row) => sum + row.mae, 0) / rows.length };
    }).sort((a, b) => a.mae - b.mae);
    $("bestModel").textContent = byModel[0].label;
    $("bestModelDetail").textContent = `Mean dimension MAE ${byModel[0].mae.toFixed(2)} points`;
    $("snapshotDate").textContent = `Data snapshot ${new Date(metadata.generated_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}`;
  }

  function renderBenchmark() {
    const labels = [{ key: "human", label: "Human video mean" }, ...state.data.metadata.models];
    $("benchmarkLegend").innerHTML = labels.map((item) => `
      <span class="legend-item"><i class="legend-dot" style="background:${COLORS[item.key]}"></i>${escapeHtml(item.label)}</span>
    `).join("");
    const dimensions = state.data.dimensions;
    const width = 1040;
    const height = 410;
    const margin = { left: 52, right: 18, top: 18, bottom: 92 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const groupWidth = innerWidth / dimensions.length;
    const barWidth = Math.min(22, (groupWidth - 20) / 4);
    let svg = `<svg class="benchmark-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">`;
    for (let tick = 1; tick <= 5; tick += 1) {
      const y = margin.top + innerHeight - ((tick - 1) / 4) * innerHeight;
      svg += `<line class="grid-line" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"/>`;
      svg += `<text class="axis-label" x="${margin.left - 14}" y="${y + 4}" text-anchor="end">${tick}</text>`;
    }
    dimensions.forEach((dimension, dimensionIndex) => {
      const rows = state.data.overall.filter((row) => row.dimension_key === dimension.key);
      const values = [
        { key: "human", label: "Human", value: rows[0].human_video_mean },
        ...state.data.metadata.models.map((model) => ({
          key: model.key,
          label: model.label,
          value: rows.find((row) => row.model_key === model.key).model_mean,
        })),
      ];
      const start = margin.left + dimensionIndex * groupWidth + (groupWidth - values.length * barWidth - (values.length - 1) * 4) / 2;
      values.forEach((item, itemIndex) => {
        const barHeight = ((item.value - 1) / 4) * innerHeight;
        const x = start + itemIndex * (barWidth + 4);
        const y = margin.top + innerHeight - barHeight;
        svg += `<rect class="bar" data-title="${escapeHtml(dimension.label)} · ${escapeHtml(item.label)}" data-value="${fmt(item.value)}" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="4" fill="${COLORS[item.key]}"/>`;
      });
      const labelX = margin.left + dimensionIndex * groupWidth + groupWidth / 2;
      const parts = dimension.label.split(" ");
      svg += `<text class="dimension-label" x="${labelX}" y="${height - 67}" text-anchor="middle">`;
      parts.forEach((part, index) => {
        svg += `<tspan x="${labelX}" dy="${index === 0 ? 0 : 14}">${escapeHtml(part)}</tspan>`;
      });
      svg += "</text>";
    });
    svg += "</svg>";
    $("benchmarkChart").innerHTML = svg;
    $("benchmarkChart").querySelectorAll(".bar").forEach((bar) => {
      bar.addEventListener("mousemove", (event) => showTooltip(event, `<strong>${bar.dataset.title}</strong><br>Mean ${bar.dataset.value}`));
      bar.addEventListener("mouseleave", hideTooltip);
    });
  }

  function renderFindings() {
    $("findings").innerHTML = state.data.comments.map((comment, index) => `
      <article class="finding-card">
        <span>Signal ${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHtml(comment.title)}</h3>
        <p>${escapeHtml(comment.text)}</p>
      </article>
    `).join("");
  }

  function populateControls() {
    $("agreementDimension").innerHTML = state.data.dimensions.map((dimension) =>
      `<option value="${dimension.key}">${escapeHtml(dimension.label)}</option>`
    ).join("");
    $("agreementModel").innerHTML = state.data.metadata.models.map((model) =>
      `<option value="${model.key}">${escapeHtml(model.label)}</option>`
    ).join("");
    $("agreementDimension").value = state.agreementDimension;
    $("agreementModel").value = state.agreementModel;
  }

  function agreementPoints() {
    return state.data.videos.map((video) => ({
      title: video.title,
      target: video.target_word,
      n: video.human[state.agreementDimension]?.n,
      human: video.human[state.agreementDimension]?.mean,
      model: video.models[state.agreementModel]?.scores?.[state.agreementDimension],
    })).filter((point) => point.human != null && point.model != null);
  }

  function renderAgreement() {
    const overall = activeOverall();
    $("scatterTitle").textContent = `${modelLabel(state.agreementModel)} · ${dimensionLabel(state.agreementDimension)}`;
    const points = agreementPoints();
    const width = 760;
    const height = 465;
    const margin = { left: 58, right: 28, top: 20, bottom: 55 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const scaleX = (value) => margin.left + ((value - 1) / 4) * innerWidth;
    const scaleY = (value) => margin.top + innerHeight - ((value - 1) / 4) * innerHeight;
    let svg = `<svg viewBox="0 0 ${width} ${height}" aria-label="Human mean versus model score scatterplot">`;
    for (let tick = 1; tick <= 5; tick += 1) {
      const x = scaleX(tick);
      const y = scaleY(tick);
      svg += `<line class="grid-line" x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + innerHeight}"/>`;
      svg += `<line class="grid-line" x1="${margin.left}" y1="${y}" x2="${margin.left + innerWidth}" y2="${y}"/>`;
      svg += `<text class="axis-label" x="${x}" y="${height - 27}" text-anchor="middle">${tick}</text>`;
      svg += `<text class="axis-label" x="${margin.left - 17}" y="${y + 4}" text-anchor="end">${tick}</text>`;
    }
    svg += `<line x1="${scaleX(1)}" y1="${scaleY(1)}" x2="${scaleX(5)}" y2="${scaleY(5)}" stroke="#172033" stroke-dasharray="5 6" opacity=".35"/>`;
    svg += `<text class="axis-label" x="${margin.left + innerWidth / 2}" y="${height - 5}" text-anchor="middle">Human video mean</text>`;
    svg += `<text class="axis-label" transform="translate(13 ${margin.top + innerHeight / 2}) rotate(-90)" text-anchor="middle">Model score</text>`;
    points.forEach((point, index) => {
      svg += `<circle class="scatter-point" data-index="${index}" cx="${scaleX(point.human)}" cy="${scaleY(point.model)}" r="4.5" fill="${COLORS[state.agreementModel]}" fill-opacity=".64" stroke="white" stroke-width="1"/>`;
    });
    svg += "</svg>";
    $("scatterChart").innerHTML = svg;
    $("scatterChart").querySelectorAll(".scatter-point").forEach((node) => {
      const point = points[Number(node.dataset.index)];
      node.addEventListener("mousemove", (event) => showTooltip(event, `
        <strong>${escapeHtml(point.target || point.title)}</strong><br>
        Human ${fmt(point.human)} · Model ${fmt(point.model, 0)}<br>
        Difference ${signed(point.model - point.human)}
      `));
      node.addEventListener("mouseleave", hideTooltip);
      node.addEventListener("click", () => selectVideo(point.title, true));
    });
    $("agreementMetrics").innerHTML = [
      ["Pearson r", fmt(overall.pearson_r), `p = ${overall.pearson_p < .001 ? "< .001" : fmt(overall.pearson_p, 3)}`],
      ["Spearman ρ", fmt(overall.spearman_rho), `p = ${overall.spearman_p < .001 ? "< .001" : fmt(overall.spearman_p, 3)}`],
      ["Mean absolute error", fmt(overall.mae), "scale points"],
      ["Mean bias", signed(overall.mean_bias_model_minus_human), "model − human"],
    ].map(([label, value, detail]) => `
      <article class="metric-card"><span>${label}</span><strong>${value}</strong><small>${detail}</small></article>
    `).join("");
    const ranked = points.map((point) => ({ ...point, difference: point.model - point.human }))
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference)).slice(0, 10);
    $("divergenceRows").innerHTML = ranked.map((point) => `
      <tr data-title="${escapeHtml(point.title)}">
        <td><strong>${escapeHtml(point.target || point.title)}</strong><br><small>${escapeHtml(point.title)}</small></td>
        <td>${fmt(point.human)}</td>
        <td>${fmt(point.model, 0)}</td>
        <td class="difference ${point.difference >= 0 ? "positive" : "negative"}">${signed(point.difference)}</td>
        <td>${point.n}</td>
      </tr>
    `).join("");
    $("divergenceRows").querySelectorAll("tr").forEach((row) => row.addEventListener("click", () => selectVideo(row.dataset.title, true)));
  }

  function filteredVideos() {
    const query = state.search.trim().toLowerCase();
    return state.data.videos.filter((video) => {
      const matchesCollection = state.collection === "all" || video.collection === state.collection;
      const matchesSearch = !query || `${video.title} ${video.target_word}`.toLowerCase().includes(query);
      return matchesCollection && matchesSearch;
    });
  }

  function renderVideoList() {
    const videos = filteredVideos();
    $("videoCount").textContent = `${videos.length} video${videos.length === 1 ? "" : "s"}`;
    $("videoList").innerHTML = videos.map((video, index) => `
      <button class="video-button ${video.title === state.selectedVideo ? "active" : ""}" data-title="${escapeHtml(video.title)}" type="button">
        <span class="number">${String(index + 1).padStart(3, "0")}</span>
        <span><strong>${escapeHtml(video.target_word || video.title)}</strong><small>${escapeHtml(video.title)}</small></span>
      </button>
    `).join("");
    $("videoList").querySelectorAll(".video-button").forEach((button) => {
      button.addEventListener("click", () => selectVideo(button.dataset.title));
    });
  }

  function scorePosition(value) {
    return `${((value - 1) / 4) * 100}%`;
  }

  function selectVideo(title, scroll = false) {
    state.selectedVideo = title;
    renderVideoList();
    renderVideoDetail();
    if (scroll) location.hash = "explorer";
  }

  function renderVideoDetail() {
    const video = state.data.videos.find((item) => item.title === state.selectedVideo);
    if (!video) return;
    $("videoCollection").textContent = `${video.collection || "Unclassified"} collection · ${video.source || "source unavailable"}`;
    $("videoTitle").textContent = video.target_word || video.title;
    $("videoTarget").textContent = video.title;
    $("videoHumanN").textContent = video.human_response_count ? `Human n = ${video.human_response_count}` : "No human ratings";
    $("videoScoreChart").innerHTML = state.data.dimensions.map((dimension) => {
      const human = video.human[dimension.key];
      const humanDot = human.mean == null ? "" : `
        ${human.ci_low != null ? `<span class="human-range" style="left:${scorePosition(human.ci_low)};width:calc(${scorePosition(human.ci_high)} - ${scorePosition(human.ci_low)})"></span>` : ""}
        <span class="score-dot human" style="left:${scorePosition(human.mean)}" title="Human ${fmt(human.mean)}"></span>`;
      const modelDots = state.data.metadata.models.map((model, index) => {
        const score = video.models[model.key]?.scores?.[dimension.key];
        return score == null ? "" : `<span class="score-dot model-${index}" style="left:${scorePosition(score)}" title="${escapeHtml(model.label)} ${score}"></span>`;
      }).join("");
      return `
        <div class="score-row">
          <div class="score-label"><strong>${escapeHtml(dimension.label)}</strong><small>Human ${fmt(human.mean)}${human.n ? ` · n ${human.n}` : ""}</small></div>
          <div class="score-track">${humanDot}${modelDots}</div>
        </div>`;
    }).join("") + `<div class="scale-numbers"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>`;
    $("modelReadings").innerHTML = state.data.metadata.models.map((model) => {
      const reading = video.models[model.key];
      if (!reading) return `<article class="model-reading"><div class="reading-heading"><strong>${escapeHtml(model.label)}</strong><span>No output</span></div></article>`;
      const confidence = reading.coherence?.confidence || "not recorded";
      return `
        <article class="model-reading">
          <div class="reading-heading"><strong>${escapeHtml(model.label)}</strong><span>Confidence: ${escapeHtml(confidence)}</span></div>
          <p>${escapeHtml(reading.description || "No description supplied.")}</p>
          <details>
            <summary>Show all seven rationales</summary>
            <div class="rationale-list">
              ${state.data.dimensions.map((dimension) => `
                <div class="rationale-item">
                  <b>${escapeHtml(dimension.label)}</b>
                  <em>${reading.scores[dimension.key]}</em>
                  <span>${escapeHtml(reading.rationales[dimension.key])}</span>
                </div>
              `).join("")}
            </div>
          </details>
        </article>`;
    }).join("");
  }

  function renderLanguages() {
    const total = state.data.metadata.languages.reduce((sum, language) => sum + language.responses, 0);
    $("languageBars").innerHTML = state.data.metadata.languages
      .slice().sort((a, b) => b.responses - a.responses)
      .map((language) => {
        const percent = language.responses / total * 100;
        return `
          <div class="language-row">
            <span>${escapeHtml(language.label)}</span>
            <div class="language-track"><div class="language-fill" style="width:${percent}%"></div></div>
            <strong>${language.responses.toLocaleString()} · ${percent.toFixed(1)}%</strong>
          </div>`;
      }).join("");
  }

  function downloadSummary() {
    const headers = [
      "model", "dimension", "paired_videos", "human_video_mean", "model_mean",
      "mean_bias_model_minus_human", "mae", "rmse", "pearson_r", "pearson_p",
      "spearman_rho", "spearman_p", "paired_t_p", "paired_t_p_bh",
    ];
    const csv = [
      headers.join(","),
      ...state.data.overall.map((row) => headers.map((key) => {
        const value = key === "model" ? row.model : key === "dimension" ? row.dimension : row[key];
        return `"${String(value ?? "").replaceAll('"', '""')}"`;
      }).join(",")),
    ].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "gesture_model_human_summary.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function bindEvents() {
    $("agreementDimension").addEventListener("change", (event) => {
      state.agreementDimension = event.target.value;
      renderAgreement();
    });
    $("agreementModel").addEventListener("change", (event) => {
      state.agreementModel = event.target.value;
      renderAgreement();
    });
    $("videoSearch").addEventListener("input", (event) => {
      state.search = event.target.value;
      renderVideoList();
    });
    $("collectionFilter").addEventListener("change", (event) => {
      state.collection = event.target.value;
      renderVideoList();
    });
    $("downloadSummary").addEventListener("click", downloadSummary);
    const links = [...document.querySelectorAll(".nav-link")];
    const sections = links.map((link) => document.querySelector(link.getAttribute("href")));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    sections.forEach((section) => observer.observe(section));
  }

  async function init() {
    try {
      const response = await fetch("data.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`Data request failed (${response.status})`);
      state.data = await response.json();
      state.selectedVideo = state.data.videos.find((video) => video.human_response_count)?.title || state.data.videos[0]?.title;
      populateHeader();
      populateControls();
      renderBenchmark();
      renderFindings();
      renderAgreement();
      renderVideoList();
      renderVideoDetail();
      renderLanguages();
      bindEvents();
    } catch (error) {
      document.querySelector("main").innerHTML = `<section class="hero"><div><p class="eyebrow">Unable to load</p><h1>Analysis data unavailable.</h1><p class="lede">${escapeHtml(error.message)}</p></div></section>`;
    }
  }

  init();
})();
