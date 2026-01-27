// 從儲存空間讀取資料
let masteredSkills = JSON.parse(localStorage.getItem('chefMastery')) || [];

function updateSkillUI() {
    const display = document.getElementById('skill-display');
    const rank = document.getElementById('player-rank');
    
    if (masteredSkills.length === 0) {
        display.innerHTML = '<p id="empty-msg">目前尚未認領任何技能...</p>';
        rank.innerText = "新手學徒";
    } else {
        display.innerHTML = '';
        masteredSkills.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'skill-card';
            span.innerText = `✔️ ${skill}`;
            display.appendChild(span);
        });
        
        // 根據認領數量提升階級
        if (masteredSkills.length >= 3) rank.innerText = "料理達人";
        else if (masteredSkills.length >= 1) rank.innerText = "進階廚師";
    }
}

function startLesson(type) {
    const storyText = document.getElementById('story-text');
    const choices = document.getElementById('choices');
    
    if (type === 'knife') {
        storyText.innerText = "你完成了食材切絲與塊狀切割的練習。是否將「基礎刀法」認領至你的修行清單？";
        choices.innerHTML = `<button onclick="claim('基礎刀法')">確認認領</button><button onclick="backToMenu()">再練習一下</button>`;
    } else if (type === 'heat') {
        storyText.innerText = "你掌握了煎、炒、燉的火候轉換技巧。是否認領「火候掌控」？";
        choices.innerHTML = `<button onclick="claim('火候掌控')">確認認領</button><button onclick="backToMenu()">再練習一下</button>`;
    } else if (type === 'seasoning') {
        storyText.innerText = "你理解了鹹、甜、酸、鮮的平衡點。是否認領「核心調味」？";
        choices.innerHTML = `<button onclick="claim('核心調味')">確認認領</button><button onclick="backToMenu()">再練習一下</button>`;
    }
}

function claim(skill) {
    if (!masteredSkills.includes(skill)) {
        masteredSkills.push(skill);
        localStorage.setItem('chefMastery', JSON.stringify(masteredSkills));
        alert(`已成功認領技能：${skill}`);
    } else {
        alert("你已經認領過這項技能了！");
    }
    updateSkillUI();
    backToMenu();
}

function backToMenu() {
    document.getElementById('story-text').innerText = "練習還在繼續，接下來要挑戰哪一項？";
    document.getElementById('choices').innerHTML = `
        <button onclick="startLesson('knife')">🔪 基礎刀法練習</button>
        <button onclick="startLesson('heat')">🔥 火候掌控入門</button>
        <button onclick="startLesson('seasoning')">🧂 核心調味邏輯</button>
    `;
}

function clearData() {
    if (confirm("確定要刪除所有認領紀錄嗎？")) {
        localStorage.removeItem('chefMastery');
        masteredSkills = [];
        updateSkillUI();
        backToMenu();
    }
}

// 初始啟動
updateSkillUI();
