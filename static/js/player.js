class MusicPlayer {
    constructor() {
        this.audio = new Audio('/static/music/background.mp3');
        this.audio.loop = true;
        this.isPlaying = false;
        this.currentVolume = parseFloat(localStorage.getItem('musicVolume')) || 0.5;
        this.isPlayerVisible = localStorage.getItem('playerVisible') !== 'false';
        this.lastPlayTime = parseFloat(localStorage.getItem('musicCurrentTime')) || 0;

        this.initializePlayer();
        this.setupEventListeners();
        this.updateProgress();
        
        // 恢复上次的播放状态（不包括显示状态）
        this.restoreState();
        
        // 单独处理显示状态
        this.restoreVisibility();
    }

    restoreState() {
        // 恢复音量
        this.audio.volume = this.currentVolume;
        this.updateVolumeUI();

        // 恢复播放位置
        this.audio.currentTime = this.lastPlayTime;

        // 恢复播放状态
        if(localStorage.getItem('isPlaying') === 'true') {
            this.play();
        }
    }

    restoreVisibility() {
        const player = document.querySelector('.music-player');
        const floatingBtn = document.querySelector('.floating-music-btn');
        
        if (!this.isPlayerVisible) {
            player.classList.add('hidden');
            floatingBtn.classList.add('visible');
        } else {
            player.classList.remove('hidden');
            floatingBtn.classList.remove('visible');
        }
    }

    togglePlayerVisibility() {
        const player = document.querySelector('.music-player');
        const floatingBtn = document.querySelector('.floating-music-btn');
        this.isPlayerVisible = !this.isPlayerVisible;
        
        player.classList.toggle('hidden', !this.isPlayerVisible);
        floatingBtn.classList.toggle('visible', !this.isPlayerVisible);
        
        localStorage.setItem('playerVisible', this.isPlayerVisible.toString());
    }

    showPlayer() {
        const player = document.querySelector('.music-player');
        const floatingBtn = document.querySelector('.floating-music-btn');
        
        this.isPlayerVisible = true;
        player.classList.remove('hidden');
        floatingBtn.classList.remove('visible');
        localStorage.setItem('playerVisible', 'true');
    }

    initializePlayer() {
        // 创建播放器HTML结构
        const playerHTML = `
            <div class="music-player">
                <div class="toggle-player">
                    <svg viewBox="0 0 24 24">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                </div>
                <div class="player-header">
                    <div class="player-title">背景音乐</div>
                </div>
                <div class="music-info">
                    <div class="song-title">追梦光芒</div>
                    <div class="artist">沪上青年</div>
                </div>
                <div class="player-controls">
                    <button class="play-pause-btn">
                        <svg class="play-icon" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        <svg class="pause-icon" viewBox="0 0 24 24" style="display: none;">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                    </button>
                </div>
                <div class="progress-container">
                    <div class="progress-bar"></div>
                </div>
                <div class="time-info">
                    <span class="current-time">0:00</span>
                    <span class="duration">0:00</span>
                </div>
                <div class="volume-control">
                    <svg class="volume-icon" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    <div class="volume-slider">
                        <div class="volume-progress"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', playerHTML);
        
        // 初始化音量
        this.audio.volume = this.currentVolume;
        this.updateVolumeUI();

        // 添加悬浮按钮HTML
        const floatingBtnHTML = `
            <div class="floating-music-btn">
                <svg viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', floatingBtnHTML);
    }

    setupEventListeners() {
        // 播放/暂停按钮
        const playPauseBtn = document.querySelector('.play-pause-btn');
        playPauseBtn.addEventListener('click', () => this.togglePlay());

        // 进度条控制
        const progressContainer = document.querySelector('.progress-container');
        progressContainer.addEventListener('click', (e) => this.setProgress(e));

        // 音量控制
        const volumeSlider = document.querySelector('.volume-slider');
        volumeSlider.addEventListener('click', (e) => this.setVolume(e));

        // 切换播放器显示/隐藏
        const togglePlayer = document.querySelector('.toggle-player');
        togglePlayer.addEventListener('click', () => this.togglePlayerVisibility());

        // 监听音频加载完成事件
        this.audio.addEventListener('loadedmetadata', () => {
            this.updateDurationDisplay();
        });

        // 保持播放状态
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
            this.updateTimeDisplay();
        });

        // 添加悬浮按钮事件监听
        const floatingBtn = document.querySelector('.floating-music-btn');
        floatingBtn.addEventListener('click', () => {
            this.showPlayer();
            this.addMusicNote(floatingBtn);
        });

        // 添加页面卸载前的状态保存
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicCurrentTime', this.audio.currentTime.toString());
        });

        // 定期保存当前播放时间
        setInterval(() => {
            localStorage.setItem('musicCurrentTime', this.audio.currentTime.toString());
        }, 1000);
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        this.updatePlayPauseUI();
        localStorage.setItem('isPlaying', 'true');
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayPauseUI();
        localStorage.setItem('isPlaying', 'false');
    }

    updatePlayPauseUI() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');
        
        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    setProgress(e) {
        const width = e.currentTarget.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }

    updateProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            progressBar.style.width = progress + '%';
        }
    }

    setVolume(e) {
        const width = e.currentTarget.clientWidth;
        const clickX = e.offsetX;
        this.currentVolume = clickX / width;
        this.audio.volume = this.currentVolume;
        this.updateVolumeUI();
        localStorage.setItem('musicVolume', this.currentVolume.toString());
    }

    updateVolumeUI() {
        const volumeProgress = document.querySelector('.volume-progress');
        volumeProgress.style.width = (this.currentVolume * 100) + '%';
    }

    // 添加音符动画效果
    addMusicNote(element) {
        const notes = ['♪', '♫', '♬', '♩'];
        const note = document.createElement('span');
        note.className = 'music-note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        
        // 随机位置
        const x = Math.random() * 40 - 20;
        note.style.left = `${element.offsetLeft + x}px`;
        note.style.top = `${element.offsetTop}px`;
        
        document.body.appendChild(note);
        
        // 动画结束后移除元素
        note.addEventListener('animationend', () => {
            note.remove();
        });
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateTimeDisplay() {
        const currentTimeEl = document.querySelector('.current-time');
        currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }

    updateDurationDisplay() {
        const durationEl = document.querySelector('.duration');
        durationEl.textContent = this.formatTime(this.audio.duration);
    }
}

// 确保只创建一个全局实例
if (!window.musicPlayer) {
    window.musicPlayer = new MusicPlayer();
} 