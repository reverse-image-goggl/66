// Directly instantiate the Unity game
window.isRussian = false; // or any default value you prefer
window.timeToShow = 4500; // or any default value you prefer

window.gameInstance = UnityLoader.instantiate("gameContainer", "Build/SLR_0_3_5_CG19.json", {
    onProgress: UnityProgress,
    Module: {
        onRuntimeInitialized: function() {
            UnityProgress(window.gameInstance, "complete");
        }
    }
});