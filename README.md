<p align="center"><img src="assets/rml-io-dashboard.svg" width=150 height=150/></p>
<p align="center"><b>RML.io Dashboard</b></p>
<p align="center">
<a href="https://mit-license.org/"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square"/></a>
<a href="https://github.com/oSoc20/rml-workbench-front-end/releases"><img src="https://img.shields.io/badge/Version-0.1.0-blue.svg?style=flat-square"/></a>
</p>
<p align="center">RML.io Dashboard is a web application which allows you to use <a href="https://rml.io/">RML.io</a> to generate high-quality knowledge graphs.<p>

---

## Getting Started

Start by cloning the repository:

    git clone https://github.com/oSoc20/rml-workbench-front-end

Next, let's install the dependencies:

    yarn install

Finally, launch the web server:

    yarn start

The website is now available locally on `http://localhost:8080`!

**NOTE:** for ease of development, [the backend](https://github.com/oSoc20/rml-workbench-back-end)
is available on another repository.

## Use-cases

A set of [use cases of knowledge graphs](https://github.com/kg-construct/use-cases) is available so
that you can have a better global vision of the panel of possibilities that is provided to you.

## Vocabulary

The following is a non-exhaustive list of commonly used vocabulary:

<dl>
  <dt>Processor</dt>
  <dd>Generates a target according to a mapping config.</dd>

  <dt>Source</dt>
  <dd>An input files (e.g. CSV, JSON, XML) or an RDF file (e.g. N-Quads, TriG, Turtle).</dd>

  <dt>Target</dt>
  <dd>A RDF file (e.g. N-Quads, TriG, Turtle).</dd>
</dl>

## FAQ

### What's knowledge graphs?

A knowledge graph acquires and integrates information into an ontology and applies a reasoner to
derive new knowledge. With a knowledge graph, a machine machine can easily understand and extract
the information.

### Where knowledge graphs are used?

Knowledge graphs are often used in various areas of machine learning (ML), natural language
processing (NLP) and search.

## License

Code is under the [MIT License](https://github.com/oSoc20/rml-workbench-front-end/blob/master/LICENSE).
