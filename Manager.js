
//*-------- Show Interstitial --------*//
function ShowInter(complete) {
	ysdk.adv.showFullscreenAdv({
		callbacks: {
			onClose: function(wasShown) {
			// some action after close
				if(complete)
					complete();
			},
			onError: function(error) {
			// some action on error
				window.adShowing = false;
				if(complete)
					complete();	
			}
		}
	});
	
}

//*-------- Show Rewarded --------*//
function ShowRewarded(success, failure) {
	ysdk.adv.showRewardedVideo({
		callbacks: {
			onOpen: () => {
				window.rewardDone = false;
			},
			onRewarded: () => {
				window.rewardDone = true;
			},
			onClose: () => {
				if(window.rewardDone)
					success();
				else
					failure();
			},
			onError: (e) => {
				if(failure)
					failure();
				Prompt("Ads not availabe, try again later");
			}
		}
	})
}

YaGames
.init()
.then(ysdk => {
	console.log('Yandex SDK initialized');
	window.ysdk = ysdk;
	window.isRussian = ysdk.environment.i18n.lang == "ru";
	window.timeToShow = 4500;
	window.gameInstance = UnityLoader.instantiate("gameContainer", "Build/SLR_0_3_5_CG19.json", {
		onProgress: UnityProgress,
		Module: {
			onRuntimeInitialized: function() {
				UnityProgress(gameInstance, "complete")
			}
		}
	});
	return ysdk.getFlags();
}).then(flags => {
	window.adState = parseInt(flags.currentState) == 1;
	window.timeToShow = parseInt(flags.timeToShow);
});

function Prompt(msg, duration = 3e3) {
	if (!this.prompt_) {
		this.prompt_ = document.createElement('div');
		this.prompt_.style.cssText = "font-family:siyuan;max-width:80%;min-width:320px;padding:10px 10px 10px 10px;min-height:40px;color: rgb(255, 255, 255);line-height: 20px;text-align:center;border-radius: 4px;position: fixed;top: 40%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
		document.body.appendChild(this.prompt_);
	}
	this.prompt_.innerHTML = msg;
	duration = isNaN(duration) ? 3e3 : duration;
	this.prompt_.style.display = "inline";
	this.prompt_.style.opacity = '1';
	setTimeout(function() {
		var d = 0.5;
		this.prompt_.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
		this.prompt_.style.opacity = '0';
		this.prompt_.style.display = "none";
	}.bind(this), duration);
}