**Nickel.rs Demo WebApp**

This is a demo app written in Rust. It uses the <a href="http://nickel.rs/" target="_blank">Nickel.rs</a> web framework to create a simple web server.
The frontend part is based on JavaScript by using <a href="http://www.ractivejs.org/" target="_blank">RactiveJS</a>, Bootstrap and Font Awesome.

*Building*

Rust sources are built with `cargo build`.
JavaScript building is done either with Gulp or WebPack: `gulp all` or `webpack`

*LiveReload*

For easier frontend development this demo utilizes the LiveReload plugin (you need a separate plugin for your browser).

*Running*

Use `gulp watch` to run in continuous development mode with HapiJS & LiveReload.
Use `npm start` to run the current version with HapiJS.
Use `cargo run` to run with Nickel.rs.


To run the app with HapiJS type `npm start` in the console.


*Structure*

The frontend is located under directory `static`. The main rust source is `src/main.rs`. The
templates for Nickel.rs are under `templates`. The template named `content.tpl` is also used by the
RactiveJS frontend library (under `static/js/app/main.js`). This is to avoid duplicates between Rust backend
and JS frontend.

*Templates*

However, Nickel's *mustache*-templates are not as powerful as RactiveJS' mustaches are. For example, there's
no logic whatsoever. Also it's not possible to create some deeper template layers, like this:

`main.tpl`

<html>
{{> template1 }}
</html>

`template1.tpl`    ---> this is possible with Nickel.rs
<template1>
<div>data, data</div>
{{> template2 }}
</template1>

`template2.tpl`   ---> this is NOT possible. Use RactiveJS for such combinations.
<template2>
<div>data, data, data</div>
</template2>

*License*

MIT