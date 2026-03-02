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
    switchView('form-view');
}

function saveRecipe() {
    const id = document.getElementById('entry-id').value;
    const recipeData = {
        id: id ? Number(id) : Date.now(),
        title: document.getElementById('input-title').value,
        meat: document.getElementById('input-meat').value,
        tier: document.getElementById('input-tier').value,
        ingredients: document.getElementById('input-ingredients').value.split(/[、\n]/).filter(i => i.trim() !== ""),
        steps: document.getElementById('input-steps').value
    };

    if(!recipeData.title) return alert("料理名を入れてね！");

    if (id) {
        const index = recipes.findIndex(r => r.id === Number(id));
        recipes[index] = recipeData;
    } else {
        recipes.push(recipeData);
    }

    localStorage.setItem('myRecipes', JSON.stringify(recipes));
    renderList();
    id ? showDetail(recipeData) : switchView('list-view');
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
    
    // フィルタリングとTier順ソート
    let filtered = recipes.filter(r => {
        return (!meatFilter || r.meat === meatFilter) && (!tierFilter || r.tier === tierFilter);
    });

    // Tierが低い(簡単)順に並べる
    filtered.sort((a, b) => a.tier - b.tier);

    filtered.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'recipe-item';
        div.innerHTML = `
            <strong>${recipe.title}</strong>
            <div class="recipe-info">肉: ${recipe.meat} / Tier: ${recipe.tier}</div>
            <button class="delete-btn" onclick="deleteRecipe(${recipe.id}, event)">×</button>
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
}

function deleteRecipe(id, event) {
    event.stopPropagation();
    if(!confirm("削除するよ？")) return;
    recipes = recipes.filter(r => r.id !== id);
    localStorage.setItem('myRecipes', JSON.stringify(recipes));
    renderList();
}

function showList() { switchView('list-view'); }
function closeForm() { currentRecipe ? showDetail(currentRecipe) : switchView('list-view'); }

renderList();