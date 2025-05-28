document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の参照を取得
    const board = document.getElementById('board');
    const boardImage = document.getElementById('board-image');
    const pinsContainer = document.getElementById('pins-container');
    const teacherModeBtn = document.getElementById('teacher-mode');
    const studentModeBtn = document.getElementById('student-mode');
    const uploadBtn = document.getElementById('upload-image');
    const imageUpload = document.getElementById('image-upload');
    const clearPinsBtn = document.getElementById('clear-pins');
    const pinCountSpan = document.getElementById('pin-count');
    const teacherControls = document.querySelector('.teacher-controls');
    const studentControls = document.querySelector('.student-controls');

    // アプリの状態
    let isTeacherMode = false;
    let pins = [];
    
    // テスト用のピンを追加（動作確認用）
    setTimeout(() => {
        console.log("テストピンを追加します");
        addPin(50, 50);
        updatePinCount();
    }, 1000);

    // モード切り替え機能
    teacherModeBtn.addEventListener('click', function() {
        console.log("先生モードに切り替えました");
        isTeacherMode = true;
        teacherModeBtn.classList.add('active');
        studentModeBtn.classList.remove('active');
        teacherControls.classList.remove('hidden');
        studentControls.classList.add('hidden');
    });

    studentModeBtn.addEventListener('click', function() {
        console.log("生徒モードに切り替えました");
        isTeacherMode = false;
        studentModeBtn.classList.add('active');
        teacherModeBtn.classList.remove('active');
        studentControls.classList.remove('hidden');
        teacherControls.classList.add('hidden');
    });

    // 画像アップロード機能
    uploadBtn.addEventListener('click', function() {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                boardImage.src = e.target.result;
                console.log("画像をアップロードしました");
            };
            reader.readAsDataURL(file);
        }
    });

    // ピン追加機能
    board.addEventListener('click', function(e) {
        console.log("ボードがクリックされました");
        
        if (isTeacherMode) {
            console.log("教師モードなのでピン追加をスキップします");
            return; // 教師モードではピンを追加できない
        }

        const rect = board.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        console.log(`ピン追加位置: x=${x}, y=${y}`);

        // ピンを追加
        addPin(x, y);

        // ピンの数を更新
        updatePinCount();
    });

    // ピンをクリアする機能
    clearPinsBtn.addEventListener('click', function() {
        console.log("全てのピンを削除します");
        pinsContainer.innerHTML = '';
        pins = [];
        updatePinCount();
    });

    // ピンを追加する関数
    function addPin(x, y) {
        console.log(`ピンを作成します: x=${x}, y=${y}`);
        const pin = document.createElement('div');
        pin.className = 'pin';
        pin.style.left = `${x}%`;
        pin.style.top = `${y}%`;
        
        // デバッグ用のスタイル（より見やすくする）
        pin.style.backgroundColor = 'red';
        pin.style.width = '20px';
        pin.style.height = '20px';
        pin.style.position = 'absolute';
        pin.style.borderRadius = '50%';
        pin.style.transform = 'translate(-50%, -50%)';
        pin.style.zIndex = '1000'; // 最前面に表示

        pinsContainer.appendChild(pin);
        console.log("ピンが追加されました");

        // ピンの情報を保存
        pins.push({ x, y });

        // ピンのクリックイベント（削除機能）
        pin.addEventListener('click', function(e) {
            if (isTeacherMode) {
                e.stopPropagation();
                pinsContainer.removeChild(pin);
                const index = pins.findIndex(p => p.x === x && p.y === y);
                if (index !== -1) {
                    pins.splice(index, 1);
                }
                updatePinCount();
                console.log("ピンが削除されました");
            }
        });
    }

    // ピン数を更新する関数
    function updatePinCount() {
        pinCountSpan.textContent = pins.length;
        console.log(`ピン総数: ${pins.length}`);
    }
});
