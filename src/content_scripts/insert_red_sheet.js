"use strict";

(() => {
    const redSheetElement = document.createElement("div");
    redSheetElement.style.background = "rgba(255, 0, 0, 0.8)";
    redSheetElement.style.position = "fixed";
    redSheetElement.style.top = "0";
    redSheetElement.style.left = "0";
    redSheetElement.style.width = "60%";
    redSheetElement.style.height = "60%";
    redSheetElement.style.zIndex = "2147483647";
    redSheetElement.style.display = "none";
    document.body.appendChild(redSheetElement);

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === "toggle") {
            if (redSheetElement.style.display === "block") {
                redSheetElement.style.display = "none";
            } else {
                redSheetElement.style.display = "block";
            }
        }
    });

    var isDragging = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    redSheetElement.addEventListener("mousedown", dragStart);
    redSheetElement.addEventListener("mouseup", dragEnd);
    redSheetElement.addEventListener("mousemove", drag);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === redSheetElement) {
            isDragging = true;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, redSheetElement);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

})();
