(function () {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav-links");

    function setMenu(open) {
        nav.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    }

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            setMenu(!nav.classList.contains("open"));
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setMenu(false);
            });
        });
    }

    var storageKey = "analytics-consent";
    var measurementId = "G-D8BHGJPNF8";

    function loadAnalytics() {
        if (window.__analyticsLoaded) {
            return;
        }
        window.__analyticsLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", measurementId);
        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
        document.head.appendChild(script);
    }

    var choice = null;
    try {
        choice = localStorage.getItem(storageKey);
    } catch (error) {
        choice = null;
    }

    if (choice === "granted") {
        loadAnalytics();
    }

    var banner = document.getElementById("cookie-banner");
    if (!banner || choice) {
        return;
    }

    banner.hidden = false;

    document.getElementById("cookie-accept").addEventListener("click", function () {
        try {
            localStorage.setItem(storageKey, "granted");
        } catch (error) {}
        banner.hidden = true;
        loadAnalytics();
    });

    document.getElementById("cookie-deny").addEventListener("click", function () {
        try {
            localStorage.setItem(storageKey, "denied");
        } catch (error) {}
        banner.hidden = true;
    });
})();
