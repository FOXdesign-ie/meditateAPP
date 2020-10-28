const app = () => {
    const audio = document.querySelector('.sound');
    const video = document.querySelector('.video-container video');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');

    // Audio
    const soundPicker = document.querySelectorAll('.sound-picker-container button');
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    // Time select
    const timeSelect = document.querySelectorAll('.time-select-container button');
    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    // Duration 
    let exampleDuration = 600;
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Choose sound and video
    soundPicker.forEach(sound => {
        sound.addEventListener("click", function(){
            audio.src=this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(audio);
        });
    });

    // Play sound
    play.addEventListener("click", () => {
        checkPlaying(audio);
    });

    // Select sound
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
            exampleDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(exampleDuration / 60)}:${Math.floor(exampleDuration % 60)}`;
        });
    });

    // Start/Stop
    const checkPlaying = audio => {
        if(audio.paused) {
            audio.play();
            video.play();
            play.src = './assets/svg/pause.svg';
        } else {
            audio.pause();
            video.pause();
            play.src = './assets/svg/play.svg';
        }
    };

    // Cicrle animation
    audio.ontimeupdate = () => {
        let currentTime = audio.currentTime;
        let elapsed = exampleDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / exampleDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= exampleDuration){
            audio.pause();
            audio.currentTime = 0;
            play.src = './assets/svg/play.svg';
            video.pause();
        }
    };
};

app();