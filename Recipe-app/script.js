const  meals = document.getElementById('meals')
const favoriteContainer = document.getElementById('fav-meals')
const searchTerm = document.getElementById('search-term')
const searchBtn = document.getElementById('search')
const mealPopup = document.getElementById('meal-popup')
const popupCloseBtn = document.getElementById('close-popup')
const mealInfo = document.getElementById('meal-info')


const getRandomMeal=async ()=>{
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const respData = await resp.json();
    const randomMeal = respData.meals[0]

    addMeal(randomMeal, true)
}

const getMealById =async(id)=>{
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    const respData = await resp.json();
    const meal = respData.meals[0]
    return meal
}

const getMealsBySearch=async(term)=>{
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term)
    const respData = await resp.json();
    const meals = respData.meals
    return meals
}


getRandomMeal()


const addMeal = (mealData,random = false)=>{
    const meal = document.createElement('div')
    meal.classList.add('meal')
    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random Recipe</span>`:''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn" >
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    const btn = meal.querySelector('.meal-body .fav-btn');
    btn.addEventListener("click",()=>{
        if(btn.classList.contains('active')){
            removeMealFromLS(mealData.idMeal)
            btn.classList.remove('active')
        }else{
            addMealLS(mealData.idMeal)
            btn.classList.add('active')
        }
        //clean the container
        
        fetchFacMeals()
    })
    meal.addEventListener('click',()=>{
        showMealInfo(mealData)
    })
    meals.appendChild(meal)
}

const addMealLS=(mealId)=>{
    const mealIds = getMealFromLS()
    localStorage.setItem('mealIds',JSON.stringify([...mealIds,mealId]));
}

const removeMealFromLS=(mealId)=>{
    const mealIds = getMealFromLS();

    localStorage.setItem('mealIds',JSON.stringify(mealIds.filter(id=>id!==mealId)))
}

const getMealFromLS=()=>{
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}



const fetchFacMeals=async()=>{

    favoriteContainer.innerHTML=''
    const mealIds = getMealFromLS()

    for (let i=0; i<mealIds.length;i++){
        const mealId = mealIds[i]
        let meal = await getMealById(mealId)
        
        addMealToFav(meal)
    }
   
}

fetchFacMeals()

const addMealToFav = (mealData)=>{
    const favMeal = document.createElement('li')
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    const btn = favMeal.querySelector('.clear')
    btn.addEventListener('click',()=>{
        removeMealFromLS(mealData.idMeal)
        fetchFacMeals()
    })

    favMeal.addEventListener('click',()=>{
        showMealInfo(mealData)
    })

    favoriteContainer.appendChild(favMeal)
}


const showMealInfo=(mealData)=>{
    mealInfo.innerHTML=''
    const meal = document.createElement('div')

    meal.innerHTML=`
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>
            ${mealData.strInstructions}
        </p>
    `

    mealInfo.appendChild(meal)
    mealPopup.classList.remove('hidden')
}

searchBtn.addEventListener('click',async()=>{
    meals.innerHTML=''
    const search = searchTerm.value;
    const mealsSub = await getMealsBySearch(search)

    if(mealsSub){
        mealsSub.forEach((meal) => {
            addMeal(meal)
        });
    }

  
})


popupCloseBtn.addEventListener('click',()=>{
    mealPopup.classList.add('hidden')

})