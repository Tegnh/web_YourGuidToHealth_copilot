document.getElementById('nutritionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // Calculate BMI
    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);
    
    // Calculate Ideal Weight
    const idealWeight = calculateIdealWeight(height, gender);
    
    // Calculate Daily Calories
    const bmr = calculateBMR(weight, height, age, gender);
    const dailyCalories = calculateDailyCalories(bmr, activity, goal);

    // Generate Meal Plan
    const mealPlan = generateMealPlan(dailyCalories, goal);

    // Display Results
    displayResults(bmi, bmiCategory, idealWeight, dailyCalories, mealPlan);
});

function calculateBMI(weight, height) {
    return (weight / Math.pow(height/100, 2)).toFixed(1);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'نقص في الوزن';
    if (bmi < 25) return 'وزن طبيعي';
    if (bmi < 30) return 'زيادة في الوزن';
    return 'سمنة';
}

function calculateIdealWeight(height, gender) {
    if (gender === 'male') {
        return ((height - 100) - ((height - 150) / 4)).toFixed(1);
    }
    return ((height - 100) - ((height - 150) / 2.5)).toFixed(1);
}

function calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
}

function calculateDailyCalories(bmr, activity, goal) {
    let calories = bmr * activity;
    switch(goal) {
        case 'lose': calories -= 500; break;
        case 'gain': calories += 500; break;
    }
    return Math.round(calories);
}

function generateMealPlan(calories, goal) {
    const meals = {
        lowCalorie: {
            breakfast: [
                { meal: 'شوفان مع توت وعسل', calories: 250 },
                { meal: 'بيضة مسلوقة مع خبز أسمر وخضار', calories: 220 },
                { meal: 'زبادي قليل الدسم مع جرانولا وفواكه', calories: 200 }
            ],
            lunch: [
                { meal: 'صدر دجاج مشوي (120جم) مع سلطة خضراء', calories: 350 },
                { meal: 'سمك مشوي (150جم) مع خضار مطبوخة', calories: 320 },
                { meal: 'عدس مع أرز بني وخضار', calories: 400 }
            ],
            dinner: [
                { meal: 'شوربة خضار مع توست أسمر', calories: 200 },
                { meal: 'سلطة تونة مع خضروات', calories: 250 },
                { meal: 'أومليت بياض البيض مع خضار', calories: 180 }
            ],
            snacks: [
                { meal: 'تفاحة مع 7 حبات لوز', calories: 120 },
                { meal: 'موزة صغيرة', calories: 90 },
                { meal: 'خيار وجزر مع حمص', calories: 100 }
            ]
        },
        mediumCalorie: {
            breakfast: [
                { meal: 'شوفان مع موز وزبدة فول سوداني', calories: 400 },
                { meal: 'توست أسمر مع بيضتين وأفوكادو', calories: 450 },
                { meal: 'سموثي بروتين مع جرانولا وفواكه', calories: 380 }
            ],
            lunch: [
                { meal: 'صدر دجاج مشوي مع أرز بني وخضار', calories: 550 },
                { meal: 'سمك مشوي مع بطاطا مسلوقة وسلطة', calories: 500 },
                { meal: 'كينوا مع خضار وبروتين نباتي', calories: 480 }
            ],
            dinner: [
                { meal: 'سلطة دجاج مع خبز أسمر', calories: 400 },
                { meal: 'معكرونة القمح الكامل مع صلصة منزلية', calories: 450 },
                { meal: 'شوربة عدس مع توست وبيض مسلوق', calories: 380 }
            ],
            snacks: [
                { meal: 'زبادي مع جرانولا وعسل', calories: 200 },
                { meal: 'موز مع زبدة فول سوداني', calories: 250 },
                { meal: 'مكسرات نيئة (30جم)', calories: 180 }
            ]
        },
        highCalorie: {
            breakfast: [
                { meal: 'شوفان مع موز وعسل ومكسرات', calories: 600 },
                { meal: '3 بيض مع أفوكادو وخبز أسمر', calories: 650 },
                { meal: 'بان كيك بروتين مع فواكه وزبدة فول سوداني', calories: 580 }
            ],
            lunch: [
                { meal: 'صدر دجاج مشوي مع أرز وخضار وأفوكادو', calories: 750 },
                { meal: 'سلمون مشوي مع بطاطا حلوة وخضار', calories: 700 },
                { meal: 'برجر دجاج منزلي مع بطاطا مشوية', calories: 680 }
            ],
            dinner: [
                { meal: 'شوربة خضار مع معكرونة وبروتين', calories: 500 },
                { meal: 'ستيك لحم مع بطاطا مشوية وخضار', calories: 600 },
                { meal: 'سلطة دجاج كبيرة مع خبز وأفوكادو', calories: 550 }
            ],
            snacks: [
                { meal: 'سموثي بروتين مع الفواكه', calories: 300 },
                { meal: 'زبادي يوناني مع جرانولا وعسل', calories: 350 },
                { meal: 'خبز أسمر مع زبدة فول سوداني وموز', calories: 400 }
            ]
        }
    };

    // تحديد نوع الوجبات بناءً على السعرات والهدف
    let mealType;
    if (calories < 1500) {
        mealType = meals.lowCalorie;
    } else if (calories < 2200) {
        mealType = meals.mediumCalorie;
    } else {
        mealType = meals.highCalorie;
    }

    // اختيار وجبات عشوائية مع مراعاة توزيع السعرات
    function getRandomMeal(mealArray) {
        return mealArray[Math.floor(Math.random() * mealArray.length)];
    }

    const selectedMeals = {
        breakfast: getRandomMeal(mealType.breakfast),
        lunch: getRandomMeal(mealType.lunch),
        dinner: getRandomMeal(mealType.dinner),
        snacks: getRandomMeal(mealType.snacks)
    };

    return {
        breakfast: `${selectedMeals.breakfast.meal} (${selectedMeals.breakfast.calories} سعرة)`,
        lunch: `${selectedMeals.lunch.meal} (${selectedMeals.lunch.calories} سعرة)`,
        dinner: `${selectedMeals.dinner.meal} (${selectedMeals.dinner.calories} سعرة)`,
        snacks: `${selectedMeals.snacks.meal} (${selectedMeals.snacks.calories} سعرة)`,
        totalCalories: selectedMeals.breakfast.calories + 
                      selectedMeals.lunch.calories + 
                      selectedMeals.dinner.calories + 
                      selectedMeals.snacks.calories
    };
}

function displayResults(bmi, bmiCategory, idealWeight, calories, mealPlan) {
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // عرض النتائج الأساسية
    document.getElementById('results').style.display = 'block';
    document.getElementById('bmi').textContent = bmi;
    document.getElementById('bmiCategory').textContent = bmiCategory;
    document.getElementById('idealWeight').textContent = idealWeight + ' كجم';
    document.getElementById('calories').textContent = calories + ' سعرة';

    // حساب وعرض السعرات الحرارية الحالية
    const currentCalories = calculateCurrentCalories(weight, height, age, gender, activity);
    document.getElementById('currentCalories').textContent = Math.round(currentCalories) + ' سعرة';

    // توليد وعرض البرامج الغذائية المتعددة
    const mealPlans = generateMultipleMealPlans(calories, goal);
    mealPlans.forEach((plan, index) => {
        const planElement = document.getElementById(`plan${index + 1}`);
        if (planElement) {
            planElement.querySelector('.meal-grid').innerHTML = generateMealPlanHTML(plan);
        }
    });

    // توليد وعرض جدول النشاط البدني
    const schedule = generateActivitySchedule(goal, currentCalories);
    displayActivitySchedule(schedule);

    // التمرير السلس إلى النتائج
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function calculateCurrentCalories(weight, height, age, gender, activity) {
    // حساب معدل الأيض الأساسي (BMR) باستخدام معادلة Mifflin-St Jeor
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // ضرب BMR في معامل النشاط للحصول على السعرات الحرارية اليومية الحالية
    return bmr * activity;
}

function generateMultipleMealPlans(calories, goal) {
    const plans = [];
    for (let i = 0; i < 3; i++) {
        plans.push(generateMealPlan(calories, goal));
    }
    return plans;
}

function generateActivitySchedule(goal, currentCalories) {
    const activities = {
        cardio: [
            { name: 'مشي سريع', calories: 150, duration: 30 },
            { name: 'جري خفيف', calories: 250, duration: 30 },
            { name: 'سباحة', calories: 300, duration: 30 },
            { name: 'ركوب دراجة', calories: 200, duration: 30 }
        ],
        strength: [
            { name: 'تمارين قوة', calories: 200, duration: 45 },
            { name: 'تمارين وزن الجسم', calories: 150, duration: 30 },
            { name: 'يوغا', calories: 150, duration: 45 }
        ],
        rest: { name: 'راحة', calories: 0, duration: 0 }
    };

    const schedule = [];
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    days.forEach((day, index) => {
        if (index % 3 === 2) {
            schedule.push({ day, ...activities.rest });
        } else if (index % 2 === 0) {
            const activity = activities.cardio[Math.floor(Math.random() * activities.cardio.length)];
            schedule.push({ day, ...activity });
        } else {
            const activity = activities.strength[Math.floor(Math.random() * activities.strength.length)];
            schedule.push({ day, ...activity });
        }
    });

    return schedule;
}

function generateMealPlanHTML(plan) {
    return `
        <div class="meal-card">
            <h4>الفطور</h4>
            <ul><li>${plan.breakfast}</li></ul>
        </div>
        <div class="meal-card">
            <h4>الغداء</h4>
            <ul><li>${plan.lunch}</li></ul>
        </div>
        <div class="meal-card">
            <h4>العشاء</h4>
            <ul><li>${plan.dinner}</li></ul>
        </div>
        <div class="meal-card">
            <h4>وجبات خفيفة</h4>
            <ul><li>${plan.snacks}</li></ul>
            <div class="total-calories">
                مجموع السعرات: ${plan.totalCalories} سعرة
            </div>
        </div>
    `;
}

function displayActivitySchedule(schedule) {
    const tbody = document.getElementById('activitySchedule');
    tbody.innerHTML = schedule.map(activity => `
        <tr>
            <td>${activity.day}</td>
            <td>${activity.name}</td>
            <td><span class="duration-badge">${activity.duration} دقيقة</span></td>
            <td>${activity.calories} سعرة</td>
        </tr>
    `).join('');
}

// Add tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const mealPlans = document.querySelectorAll('.meal-plan-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            mealPlans.forEach(plan => plan.classList.remove('active'));
            
            button.classList.add('active');
            const planNumber = button.dataset.plan;
            document.getElementById(`plan${planNumber}`).classList.add('active');
        });
    });
});
