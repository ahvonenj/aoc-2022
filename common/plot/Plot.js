import { Webview } from "webview-nodejs";

let HTML = 
`
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Plot</title>
        <script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
    </head>
    <body>
        <div id="plot"></div>
    </body>
</html>
`;

const Plot = ({ series } = plotParams) => {
    const data = series.map(s => ({
        x: s.x,
        y: s.y,
        type: 'scatter'
    }));

    let w = new Webview({ debug: true });
    
    w.title("plot");
    w.size(800,600,2);
    w.html(HTML)

    w.init(`document.addEventListener('DOMContentLoaded', () => { 
        Plotly.newPlot('plot', ${JSON.stringify(data)});
    })`);

    w.show();
}

export default Plot;

