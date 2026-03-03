const initialRecipes = [
    { id: 1, title: "豚バラ白菜の味噌あん", meat: "豚", tier: "1", ingredients: ["豚バラ", "白菜"], steps: "豚バラを炒める→白菜を加えて蒸し焼き→味噌・みりん・酒で調味し軽くとろみ付け。", memo: "" },
    { id: 2, title: "タコライス", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "トマト", "サルサ", "チーズ"], steps: "ひき肉炒めてシーズニング→ご飯にレタス・チーズ・肉・トマト・サルサ。", memo: "" },
    { id: 3, title: "カレー", meat: "豚", tier: "1", ingredients: ["豚こま", "人参", "玉ねぎ"], steps: "具材炒める→水で煮る→ルー投入。", memo: "ケチャップ＋ソース可" },
    { id: 4, title: "肉巻き（めんつゆ）", meat: "豚", tier: "1", ingredients: ["豚肉", "野菜"], steps: "野菜を肉で巻く→焼く→めんつゆで軽く煮絡め。", memo: "" },
    { id: 22, title: "から揚げ", meat: "鶏", tier: "2", ingredients: ["鶏肉", "にんにく", "生姜"], steps: "醤油・にんにく・生姜漬け→片栗粉→揚げる。", memo: "" },
    { id: 33, title: "とんかつ", meat: "豚", tier: "3", ingredients: ["豚肉", "パン粉"], steps: "叩く→衣→揚げる。", memo: "翌日かつ丼" },
    { id: 40, title: "ローストビーフ", meat: "その他", tier: "3", ingredients: ["牛ブロック肉"], steps: "焼き固め→低温加熱。", memo: "赤ワイン" }
];

let recipes = JSON.parse(localStorage.getItem('myRecipes')) || initialRecipes;
let currentRecipe = null;

function switchView(viewId) {
    ['list-view', 'form-view', 'detail-view'].forEach(v => {
        document.getElementById(v).style.display = (v === viewId) ? 'block' : 'none';
    });
    document.getElementById('main-header').style.display = (viewId === 'list-view') ? 'flex' : 'none';
    document.getElementById('filter-section').style.display = (viewId === 'list-view') ? 'flex' : 'none';
}

function toggleForm() {
    document.getElementById('form-title').innerText = "レシピを追加";
    document.getElementById('entry-id').value = "";
    document.getElementById('input-title').value = '';
    document.getElementById('input-tier').value = "";
    document.getElementById('input-meat').value = "";
    document.getElementById('input-ingredients').value = '';
    document.getElementById('input-steps').value = '';
    document.getElementById('input-memo').value = '';
    switchView('form-view');
}

function saveRecipe() {
    const id = document.getElementById('entry-id').value;
    const title = document.getElementById('input-title').value;
    const tier = document.getElementById('input-tier').value;
    const meat = document.getElementById('input-meat').value;

    if (!title || !meat || !tier) return alert("必須項目を入力してね！");

    const recipeData = {
        id: id ? Number(id) : Date.now(),
        title: title,
        meat: meat,
        tier: tier,
        ingredients: document.getElementById('input-ingredients').value.split(/[、\n]/).filter(i => i.trim() !== ""),
        steps: document.getElementById('input-steps').value,
        memo: document.getElementById('input-memo').value
    };

    const index = id ? recipes.findIndex(r => r.id === Number(id)) : -1;
    if (index !== -1) recipes[index] = recipeData;
    else recipes.push(recipeData);

    localStorage.setItem('myRecipes', JSON.stringify(recipes));
    renderList();
    showDetail(recipeData);
}

function openEdit() {
    document.getElementById('form-title').innerText = "レシピを編集";
    document.getElementById('entry-id').value = currentRecipe.id;
    document.getElementById('input-title').value = currentRecipe.title;
    document.getElementById('input-tier').value = currentRecipe.tier;
    document.getElementById('input-meat').value = currentRecipe.meat;
    document.getElementById('input-ingredients').value = currentRecipe.ingredients.join('、');
    document.getElementById('input-steps').value = currentRecipe.steps;
    document.getElementById('input-memo').value = currentRecipe.memo || '';
    switchView('form-view');
}

function renderList() {
    const tierFilter = document.getElementById('filter-tier').value;
    const meatFilter = document.getElementById('filter-meat').value;
    const listEl = document.getElementById('recipe-list');
    listEl.innerHTML = '';
    
    let filtered = recipes.filter(r => {
        return (!tierFilter || r.tier === tierFilter) && (!meatFilter || r.meat === meatFilter);
    });

    filtered.sort((a, b) => Number(a.tier) - Number(b.tier));

    filtered.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'recipe-item';
        div.innerHTML = `
            <strong>${recipe.title}</strong>
            <div class="recipe-info">
                <span class="badge tier-${recipe.tier}">Tier ${recipe.tier}</span>
                <span class="badge bg-${recipe.meat}">${recipe.meat}</span>
            </div>
        `;
        div.onclick = () => showDetail(recipe);
        listEl.appendChild(div);
    });
}

function showDetail(recipe) {
    currentRecipe = recipe;
    switchView('detail-view');
    document.getElementById('detail-title').innerText = recipe.title;
    document.getElementById('detail-tier-tag').innerText = "Tier: " + recipe.tier;
    document.getElementById('detail-meat-tag').innerText = "肉: " + recipe.meat;
    document.getElementById('detail-ingredients').innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
    document.getElementById('detail-steps').innerText = recipe.steps || "手順なし";
    
    const memoSection = document.getElementById('memo-section');
    if (recipe.memo) {
        memoSection.style.display = 'block';
        document.getElementById('detail-memo').innerText = recipe.memo;
    } else {
        memoSection.style.display = 'none';
    }

    document.getElementById('delete-btn-detail').onclick = function() {
        if (confirm("削除する？")) {
            recipes = recipes.filter(r => r.id !== recipe.id);
            localStorage.setItem('myRecipes', JSON.stringify(recipes));
            renderList();
            showList();
        }
    };
}

function showList() { switchView('list-view'); }
function closeForm() { currentRecipe ? showDetail(currentRecipe) : showList(); }

renderList();