let recipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
let currentRecipe = null;

function switchView(viewId) {
    ['list-view', 'form-view', 'detail-view'].forEach(v => {
        document.getElementById(v).style.display = (v === viewId) ? 'block' : 'none';
    });
    document.getElementById('main-header').style.display = (viewId === 'list-view') ? 'flex' : 'none';
    document.getElementById('filter-section').style.display = (viewId === 'list-view') ? 'flex' : 'none';
}

function toggleForm() {
    document.getElementById('form-title').innerText = "新しいレシピ";
    document.getElementById('entry-id').value = "";
    document.getElementById('input-title').value = '';
    document.getElementById('input-meat').value = "";
    document.getElementById('input-tier').value = "";
    document.getElementById('input-ingredients').value = '';
    document.getElementById('input-steps').value = '';
    switchView('form-view');
}

function saveRecipe() {
    const id = document.getElementById('entry-id').value;
    const title = document.getElementById('input-title').value;
    const meat = document.getElementById('input-meat').value;
    const tier = document.getElementById('input-tier').value;

    // 必須項目チェック
    if (!title || !meat || !tier) {
        return alert("料理名、肉タグ、Tierは全部入力してね！");
    }

    const recipeData = {
        id: id ? Number(id) : Date.now(),
        title: title,
        meat: meat,
        tier: tier,
        ingredients: document.getElementById('input-ingredients').value.split(/[、\n]/).filter(i => i.trim() !== ""),
        steps: document.getElementById('input-steps').value
    };

    if (id) {
        const index = recipes.findIndex(r => r.id === Number(id));
        recipes[index] = recipeData;
    } else {
        recipes.push(recipeData);
    }

    localStorage.setItem('myRecipes', JSON.stringify(recipes));
    renderList();
    
    // 保存した後に詳細画面を表示する
    showDetail(recipeData);
}

function openEdit() {
    document.getElementById('form-title').innerText = "レシピを編集";
    document.getElementById('entry-id').value = currentRecipe.id;
    document.getElementById('input-title').value = currentRecipe.title;
    document.getElementById('input-meat').value = currentRecipe.meat;
    document.getElementById('input-tier').value = currentRecipe.tier;
    document.getElementById('input-ingredients').value = currentRecipe.ingredients.join('、');
    document.getElementById('input-steps').value = currentRecipe.steps;
    switchView('form-view');
}

function renderList() {
    const meatFilter = document.getElementById('filter-meat').value;
    const tierFilter = document.getElementById('filter-tier').value;
    const listEl = document.getElementById('recipe-list');
    
    listEl.innerHTML = '';
    
    let filtered = recipes.filter(r => {
        return (!meatFilter || r.meat === meatFilter) && (!tierFilter || r.tier === tierFilter);
    });

    // Tier順（簡単順）にソート
    filtered.sort((a, b) => Number(a.tier) - Number(b.tier));

    if (filtered.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">レシピが見つからないよ</p>';
    }

    filtered.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'recipe-item';
        div.innerHTML = `
            <strong>${recipe.title}</strong>
            <div class="recipe-info">肉: ${recipe.meat} / Tier: ${recipe.tier}</div>
        `;
        div.onclick = () => showDetail(recipe);
        listEl.appendChild(div);
    });
}

function showDetail(recipe) {
    currentRecipe = recipe;
    switchView('detail-view');
    document.getElementById('detail-title').innerText = recipe.title;
    document.getElementById('detail-meat-tag').innerText = "肉: " + recipe.meat;
    document.getElementById('detail-tier-tag').innerText = "Tier: " + recipe.tier;
    document.getElementById('detail-ingredients').innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
    document.getElementById('detail-steps').innerText = recipe.steps;

    // 削除ボタンの処理を設定
    document.getElementById('delete-btn-detail').onclick = function() {
        if (confirm("本当にこのレシピを削除してもいい？")) {
            recipes = recipes.filter(r => r.id !== recipe.id);
            localStorage.setItem('myRecipes', JSON.stringify(recipes));
            renderList();
            showList();
        }
    };
}

function showList() {
    switchView('list-view');
}

function closeForm() {
    currentRecipe ? showDetail(currentRecipe) : switchView('list-view');
}

// 最初に一覧を表示
renderList();