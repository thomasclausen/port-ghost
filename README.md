# PORT

**Port** is a simple theme with a single purpose - to bring your portfolio in focus and enable you to showcase your awesomeness.

Taking advantage of the easy editing interface inside [Ghost](https://ghost.org) and this themes simple structure, you are able to keep your portfolio up-to-date with ease.

## Installing

Setting up your blog with this theme is done in four easy steps no matter if your on [Ghost(Pro)](https://ghost.org/pricing/) og self-hosting.

### [Ghost(Pro)](https://ghost.org/pricing/)
1. Download [port-ghost.zip](https://github.com/thomasclausen/port-ghost/blob/master/port-ghost.zip?raw=true) from Github
2. Log in to your [Ghost account](https://ghost.org/login/)
3. Click on your blogs name (or the settings icon) to edit the blogs settings
4. Click on *Upload a New Theme* and select the downloaded zip-file

### Self-hosting
1. Download [port-ghost.zip](https://github.com/thomasclausen/port-ghost/blob/master/port-ghost.zip?raw=true) from Github
2. Unzip and copy the folder **port** into the Ghost theme directory `ghost/content/themes/`
3. Restart Ghost
4. Log in to your dashboard and navigate to *Settings > General > Theme*, select **Port** and save

That's all... enjoy!

## Simple customization

With Ghost it's possible to insert code into the top and bottom of your blog without editing any theme files.
This is really handy if you wan't to insert custom styling, Google Analytics' tracking code or custom meta tags.

**Custom styling**
```html
<style>
body {
  background-color: #f0f0f0;
}
</style>
```

**Custom meta tags**
```html
<meta name="twitter:site" content="@username" />
<meta name="twitter:creator" content="@username" />

<meta property="article:publisher" content="https://www.facebook.com/username" />
<meta property="article:author" content="https://www.facebook.com/username" />

<link rel="publisher" href="https://plus.google.com/+username" />
<link rel="author" href="https://plus.google.com/+username" />
```

**Google Analytics**
```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXXX-X', 'yourblog.ghost.io');
ga('send', 'pageview');
</script>
```

On the Ghost support pages there's a [easy step-by-step guide to Code Injection](http://support.ghost.org/use-code-injection/).

## Feedback

Found a bug? Please [create an issue](https://github.com/thomasclausen/port-ghost/issues) on GitHub, and I'll do my best to fix it, or if you have a bugfix ready, a pull-request are more then welcome.

Also feel free to [create an issue](https://github.com/thomasclausen/port-ghost/issues) if you have a great idea for an improvement or think there's a feature missing.

## Copyright & License

Copyright (C) 2015 Thomas Clausen - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
