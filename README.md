# Market Price and Catalyst Visualizations

Notebook-based visual research that places market-price movements alongside events and potential catalysts.

**Author:** Xavier Chen  
**Status:** Exploratory notebooks and a standalone chart component; not a packaged dashboard or a causal-inference model.

## Project description

A price chart shows what moved, but it does not explain the surrounding context. This project explores ways to make that context visible by combining market charts with event annotations.

The current repository includes work labelled GLD, SOYB, and USD/JPY, an iteration notebook, and a separate JSX chart component. A broader macroeconomic and single-stock dashboard remains a development goal.

## Contents

| Resource | Description |
| --- | --- |
| [Price and catalyst notebook](Price%20%26%20Catalyst%20visualization%20-%20GLD%20SOYB%20USDJPY.ipynb) | Market-price and event-visualization research |
| [Progressive improvement notebook](Progressive%20improvement.ipynb) | Further iterations of the visualization work |
| [Misery-index chart component](misery-index-chart.jsx) | A standalone JSX chart file; no accompanying packaged frontend is included |
| [Previously published interactive chart](https://claude.ai/public/artifacts/02c3116b-c3b8-46ee-8eb7-2001bf4cc8ab) | External artifact linked by the original README; availability is not guaranteed |

## Tech stack

Python/Jupyter notebooks and a separate JSX frontend component. A tested dependency manifest and an application build configuration are not currently included.

## Installation

For reading, use GitHub's notebook previews. For local inspection:

```bash
git clone https://github.com/Xiaowen-CHEN-Learner/AI-Projects---Price-Catalysts.git
cd AI-Projects---Price-Catalysts
python -m venv .venv
```

Activate the environment with `source .venv/bin/activate` on macOS/Linux or `.venv\Scripts\Activate.ps1` in Windows PowerShell, then install the notebook interface:

```bash
python -m pip install jupyterlab
python -m jupyterlab
```

This installs the interface only. Review the selected notebook's imports, data sources, and installation cells to determine its analytical dependencies. Local execution has not been independently validated as part of this documentation update.

The JSX file requires its own compatible frontend environment and dependencies. Do not assume that `npm install` or `npm run dev` will work in this repository without adding and validating an application configuration.

## Usage

1. Start with the price-and-catalyst notebook and inspect the data retrieval and date ranges.
2. Identify the instrument, currency, sampling frequency, and price/return convention.
3. Review the date and source of each annotation before interpreting the chart.
4. Inspect the improvement notebook to follow the subsequent iterations.
5. Record a data cutoff and known limitations when sharing a visualization.

## Research interpretation

An event annotation is context, not proof that the event caused a price move. Multiple developments may coincide, and different assets may respond on different timelines. Distinguish a sourced observation, an interpretation, and a hypothesis that requires further testing.

No trading performance or forecasting accuracy is established by the repository's charts.

## Roadmap

- Add an event-source register with publication dates and links.
- Document and test a reproducible notebook environment.
- Publish a small preview image and a worked example using permitted data.
- Separate reusable data processing from presentation code.
- Add checks for date alignment, units, missing observations, and annotation accuracy.
- Package the standalone frontend component only after its dependencies and inputs are documented.

## Contributing and contact

Open a GitHub issue with the affected notebook or component, reproduction steps, and a suggested improvement. Source corrections and visualization critiques are welcome.

[Xavier Chen on LinkedIn](https://www.linkedin.com/in/xiaowen-chen/) · [GitHub portfolio](https://github.com/Xiaowen-CHEN-Learner)

## License and data

No project-wide license is currently included. Check provider permissions before redistributing market data; do not upload credentials or restricted material.

---

Educational and research use only. Not investment advice.
