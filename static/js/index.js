window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function () {
    // Check for click events on the navbar burger icon

    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    }

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();

    function initTripleCompare(selector, init1 = 35, init2 = 70) {
        const box = document.querySelector(selector);
        if (!box) return;

        const layerBase = box.querySelector(".layer-base");
        const layerMid = box.querySelector(".layer-mid");
        const layerTop = box.querySelector(".layer-top");
        const h1 = box.querySelector(".handle-1");
        const h2 = box.querySelector(".handle-2");
        if (!layerMid || !layerTop || !h1 || !h2) return;

        let p1 = init1; // 中图分界
        let p2 = init2; // 顶图分界

        const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

        const render = () => {
            // 图1：显示左边到 p1
            layerBase.style.clipPath = `inset(0 ${100 - p1}% 0 0)`;

            // 图2：只显示 p1 到 p2 之间
            layerMid.style.clipPath = `inset(0 ${100 - p2}% 0 ${p1}%)`;

            // 图3：显示 p2 到右边
            layerTop.style.clipPath = `inset(0 0 0 ${p2}%)`;

            h1.style.left = `calc(${p1}% - 2px)`;
            h2.style.left = `calc(${p2}% - 2px)`;
        };

        function bindDrag(handle, which) {
            let dragging = false;

            handle.addEventListener("pointerdown", (e) => {
                dragging = true;
                handle.setPointerCapture(e.pointerId);
            });

            handle.addEventListener("pointermove", (e) => {
                if (!dragging) return;
                const rect = box.getBoundingClientRect();
                let x = ((e.clientX - rect.left) / rect.width) * 100;
                x = clamp(x, 0, 100);

                if (which === 1) {
                    p1 = Math.min(x, p2 - 1); // 保证 h1 在 h2 左边
                } else {
                    p2 = Math.max(x, p1 + 1);
                }
                render();
            });

            handle.addEventListener("pointerup", () => dragging = false);
            handle.addEventListener("pointercancel", () => dragging = false);
        }

        bindDrag(h1, 1);
        bindDrag(h2, 2);
        render();
    }

    initTripleCompare("#triple-compare", 25, 75);
})
