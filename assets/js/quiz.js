// Fragrance Finder Quiz functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

// Quiz configuration
const quizConfig = {
    totalQuestions: 6,
    currentQuestion: 1,
    answers: {}
};

// Fragrance database with detailed attributes
const fragranceDatabase = [
    {
        id: 1,
        name: 'Eternal Rose',
        description: 'A timeless floral bouquet with top notes of Bulgarian rose, heart of jasmine sambac, and base of smooth vanilla. Perfect for romantic souls who appreciate classic elegance.',
        category: 'floral',
        notes: ['Rose', 'Jasmine', 'Vanilla', 'Peony'],
        intensity: 3, // 1-5 scale
        longevity: 4, // hours
        season: ['spring', 'summer'],
        personality: ['romantic', 'sophisticated'],
        timeOfDay: ['daytime', 'evening'],
        price: 89.99,
        image: 'assets/images/eternal-rose.jpg',
        bestFor: 'Romantic dates, weddings, special occasions',
        rating: 4.8
    },
    {
        id: 2,
        name: 'Mystic Woods',
        description: 'A bold woody-oriental fragrance with top notes of bergamot, heart of cedarwood, and base of amber and patchouli. For the confident individual who makes a statement.',
        category: 'woody',
        notes: ['Cedarwood', 'Amber', 'Patchouli', 'Bergamot'],
        intensity: 4,
        longevity: 8,
        season: ['autumn', 'winter'],
        personality: ['confident', 'sophisticated'],
        timeOfDay: ['evening', 'night'],
        price: 109.99,
        image: 'assets/images/mystic-woods.jpg',
        bestFor: 'Evening events, business meetings, night outs',
        rating: 4.9
    },
    {
        id: 3,
        name: 'Citrus Zest',
        description: 'An invigorating citrus blend with notes of Italian bergamot, Sicilian lemon, and white musk. Perfect for those who bring energy and freshness wherever they go.',
        category: 'citrus',
        notes: ['Bergamot', 'Lemon', 'Grapefruit', 'White Musk'],
        intensity: 3,
        longevity: 5,
        season: ['spring', 'summer'],
        personality: ['energetic', 'adventurous'],
        timeOfDay: ['daytime'],
        price: 79.99,
        image: 'assets/images/citrus-zest.jpg',
        bestFor: 'Daytime activities, work, casual outings',
        rating: 4.7
    },
    {
        id: 4,
        name: 'Oriental Nights',
        description: 'A luxurious oriental fragrance with notes of vanilla, cinnamon, and tonka bean. A perfect blend of warmth and sensuality for special evenings.',
        category: 'oriental',
        notes: ['Vanilla', 'Cinnamon', 'Tonka Bean', 'Amber'],
        intensity: 5,
        longevity: 10,
        season: ['autumn', 'winter'],
        personality: ['sophisticated', 'mysterious'],
        timeOfDay: ['evening', 'night'],
        price: 129.99,
        image: 'assets/images/oriental-nights.jpg',
        bestFor: 'Special occasions, evening events, romantic dates',
        rating: 4.9
    },
    {
        id: 5,
        name: 'Ocean Breeze',
        description: 'A fresh aquatic fragrance with marine notes, sea salt, and a hint of citrus. Captures the essence of the ocean in a bottle.',
        category: 'fresh',
        notes: ['Marine Notes', 'Sea Salt', 'Bergamot', 'Amberwood'],
        intensity: 2,
        longevity: 4,
        season: ['spring', 'summer'],
        personality: ['adventurous', 'energetic'],
        timeOfDay: ['daytime'],
        price: 89.99,
        image: 'assets/images/ocean-breeze.jpg',
        bestFor: 'Daytime outings, beach trips, casual wear',
        rating: 4.6
    },
    {
        id: 6,
        name: 'Vanilla Dream',
        description: 'A warm and comforting gourmand fragrance with notes of vanilla, caramel, and tonka bean. Like a sweet embrace in a bottle.',
        category: 'gourmand',
        notes: ['Vanilla', 'Caramel', 'Tonka Bean', 'Sandalwood'],
        intensity: 3,
        longevity: 6,
        season: ['autumn', 'winter'],
        personality: ['romantic', 'warm'],
        timeOfDay: ['daytime', 'evening'],
        price: 94.99,
        image: 'assets/images/vanilla-dream.jpg',
        bestFor: 'Casual outings, dates, everyday wear',
        rating: 4.8
    },
    {
        id: 7,
        name: 'White Musk',
        description: 'A clean and sensual musk-based fragrance with floral and powdery notes. A timeless classic that works for any occasion.',
        category: 'musk',
        notes: ['White Musk', 'Jasmine', 'Sandalwood', 'Vanilla'],
        intensity: 2,
        longevity: 5,
        season: ['all'],
        personality: ['classic', 'elegant'],
        timeOfDay: ['daytime', 'evening'],
        price: 99.99,
        image: 'assets/images/white-musk.jpg',
        bestFor: 'Office wear, everyday use, any occasion',
        rating: 4.7
    },
    {
        id: 8,
        name: 'Spice Route',
        description: 'An exotic blend of spices, woods, and amber. A journey through ancient spice markets with its warm and inviting character.',
        category: 'spicy',
        notes: ['Cardamom', 'Saffron', 'Cedar', 'Amber'],
        intensity: 4,
        longevity: 8,
        season: ['autumn', 'winter'],
        personality: ['adventurous', 'confident'],
        timeOfDay: ['evening', 'night'],
        price: 119.99,
        image: 'assets/images/spice-route.jpg',
        bestFor: 'Evening events, night outs, special occasions',
        rating: 4.8
    }
];

// Initialize quiz functionality
function initializeQuiz() {
    initializeQuizNavigation();
    initializeAnswerSelection();
    initializeQuizSubmission();
    updateProgressBar();
}

// Initialize quiz navigation
function initializeQuizNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (quizConfig.currentQuestion > 1) {
                showPreviousQuestion();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateCurrentQuestion()) {
                if (quizConfig.currentQuestion < quizConfig.totalQuestions) {
                    showNextQuestion();
                } else {
                    showSubmitButton();
                }
            }
        });
    }
}

// Initialize answer selection
function initializeAnswerSelection() {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Store answer
            const questionNumber = this.name.replace('q', '');
            quizConfig.answers[questionNumber] = this.value;
            
            // Enable next button
            const nextBtn = document.getElementById('next-btn');
            const submitBtn = document.getElementById('submit-btn');
            
            if (nextBtn && nextBtn.style.display !== 'none') {
                nextBtn.disabled = false;
            }
            if (submitBtn && submitBtn.style.display !== 'none') {
                submitBtn.disabled = false;
            }
        });
    });
}

// Initialize quiz submission
function initializeQuizSubmission() {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-quiz');
    
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateAllAnswers()) {
                showQuizResults();
            }
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (validateAllAnswers()) {
                showQuizResults();
            }
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            restartQuiz();
        });
    }
}

// Show next question
function showNextQuestion() {
    const currentQ = document.querySelector(`.question[data-question="${quizConfig.currentQuestion}"]`);
    const nextQ = document.querySelector(`.question[data-question="${quizConfig.currentQuestion + 1}"]`);
    
    if (currentQ && nextQ) {
        currentQ.classList.remove('active');
        nextQ.classList.add('active');
        quizConfig.currentQuestion++;
        
        updateProgressBar();
        updateNavigationButtons();
    }
}

// Show previous question
function showPreviousQuestion() {
    const currentQ = document.querySelector(`.question[data-question="${quizConfig.currentQuestion}"]`);
    const prevQ = document.querySelector(`.question[data-question="${quizConfig.currentQuestion - 1}"]`);
    
    if (currentQ && prevQ) {
        currentQ.classList.remove('active');
        prevQ.classList.add('active');
        quizConfig.currentQuestion--;
        
        updateProgressBar();
        updateNavigationButtons();
    }
}

// Update progress bar
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    const percentage = (quizConfig.currentQuestion / quizConfig.totalQuestions) * 100;
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `Question ${quizConfig.currentQuestion} of ${quizConfig.totalQuestions}`;
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Show/hide previous button
    if (prevBtn) {
        prevBtn.style.display = quizConfig.currentQuestion > 1 ? 'inline-block' : 'none';
    }
    
    // Show/hide next and submit buttons
    if (quizConfig.currentQuestion === quizConfig.totalQuestions) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'inline-block';
    } else {
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (submitBtn) submitBtn.style.display = 'none';
    }
    
    // Disable next/submit until answer is selected
    const hasAnswer = quizConfig.answers[quizConfig.currentQuestion.toString()];
    if (nextBtn && nextBtn.style.display !== 'none') {
        nextBtn.disabled = !hasAnswer;
    }
    if (submitBtn && submitBtn.style.display !== 'none') {
        submitBtn.disabled = !hasAnswer;
    }
}

// Show submit button
function showSubmitButton() {
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (nextBtn) nextBtn.style.display = 'none';
    if (submitBtn) {
        submitBtn.style.display = 'inline-block';
        submitBtn.disabled = false;
    }
}

// Validate current question
function validateCurrentQuestion() {
    const currentAnswer = quizConfig.answers[quizConfig.currentQuestion.toString()];
    return currentAnswer !== undefined;
}

// Validate all answers
function validateAllAnswers() {
    for (let i = 1; i <= quizConfig.totalQuestions; i++) {
        if (!quizConfig.answers[i.toString()]) {
            return false;
        }
    }
    return true;
}

// Calculate fragrance match based on user's answers
function calculateFragranceMatch() {
    const userTime = quizConfig.answers['1'] || 'both';
    const userScentFamily = quizConfig.answers['2'] || 'floral';
    const userPersonality = quizConfig.answers['3'] || 'romantic';
    const userSeason = quizConfig.answers['4'] || 'spring';
    const userLongevity = quizConfig.answers['5'] || 'moderate';
    const userIntensity = quizConfig.answers['6'] || 'moderate';

    // Score each fragrance based on user preferences
    const scoredFragrances = fragranceDatabase.map(fragrance => {
        let score = 0;
        
        // Time of day match
        if (userTime === 'both' || fragrance.timeOfDay.includes(userTime)) {
            score += 3;
        }
        
        // Scent family match
        if (fragrance.category === userScentFamily) {
            score += 4;
        }
        
        // Personality match
        if (fragrance.personality.includes(userPersonality)) {
            score += 3;
        }
        
        // Season match
        if (fragrance.season.includes('all') || fragrance.season.includes(userSeason)) {
            score += 3;
        }
        
        // Longevity match
        const longevityMap = { 'light': 2, 'moderate': 4, 'long': 6 };
        const userLongevityValue = longevityMap[userLongevity] || 4;
        const longevityDiff = Math.abs(fragrance.longevity - userLongevityValue);
        score += Math.max(0, 3 - longevityDiff);
        
        // Intensity match
        const intensityMap = { 'subtle': 2, 'moderate': 3, 'strong': 4 };
        const userIntensityValue = intensityMap[userIntensity] || 3;
        const intensityDiff = Math.abs(fragrance.intensity - userIntensityValue);
        score += Math.max(0, 3 - intensityDiff);
        
        return { ...fragrance, score };
    });
    
    // Sort by score (highest first) and return top 3 matches
    const topMatches = scoredFragrances
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    return topMatches;
}

// Helper functions for display
function getScentFamilyName(key) {
    const names = {
        'floral': 'floral',
        'woody': 'woody',
        'citrus': 'citrus',
        'oriental': 'oriental',
        'fresh': 'fresh',
        'gourmand': 'sweet',
        'musk': 'musky',
        'spicy': 'spicy'
    };
    return names[key] || key;
}

function getTimeOfDayName(key) {
    const names = {
        'daytime': 'daytime',
        'evening': 'evening',
        'night': 'night',
        'both': 'day and evening'
    };
    return names[key] || key;
}

function getSeasonName(key) {
    const names = {
        'spring': 'spring',
        'summer': 'summer',
        'autumn': 'autumn',
        'winter': 'winter'
    };
    return names[key] || key;
}

function getPersonalityName(key) {
    const names = {
        'romantic': 'romantic',
        'confident': 'confident',
        'energetic': 'energetic',
        'sophisticated': 'sophisticated',
        'adventurous': 'adventurous',
        'mysterious': 'mysterious',
        'classic': 'classic',
        'warm': 'warm'
    };
    return names[key] || key;
}

function getAlternativeFragrances(excludeId, limit = 2) {
    return fragranceDatabase
        .filter(f => f.id !== excludeId)
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);
}

// Display final results after calculation
function displayFinalResults(matchedFragrances) {
    const resultContent = document.getElementById('result-content');
    const primaryFragrance = matchedFragrances[0];
    
    // Get user answers for personalization
    const userScentFamily = quizConfig.answers['2'] || 'floral';
    const userTime = quizConfig.answers['1'] || 'both';
    const userSeason = quizConfig.answers['4'] || 'spring';
    const userPersonality = quizConfig.answers['3'] || 'romantic';
    
    // Clear any previous results
    resultContent.innerHTML = '';
    
    // Create result HTML for primary match
    const resultHTML = `
        <div class="result-header">
            <h2>Your Perfect Match</h2>
            <p>Based on your preferences, we've found the perfect fragrance for you:</p>
        </div>
        
        <div class="result-card">
            <div class="result-card__image">
                <img src="${primaryFragrance.image || 'assets/images/perfume-placeholder.jpg'}" alt="${primaryFragrance.name}">
            </div>
            <div class="result-card__content">
                <h3 class="result-card__title">${primaryFragrance.name}</h3>
                <div class="result-card__rating">
                    ${'★'.repeat(Math.round(primaryFragrance.rating))}${'☆'.repeat(5 - Math.round(primaryFragrance.rating))}
                    <span>${primaryFragrance.rating.toFixed(1)} (${Math.floor(Math.random() * 100) + 50} reviews)</span>
                </div>
                <p class="result-card__price">$${primaryFragrance.price.toFixed(2)}</p>
                <p class="result-card__description">${primaryFragrance.description}</p>
                
                <div class="result-card__details">
                    <div class="detail">
                        <span class="detail__label">Best For:</span>
                        <span class="detail__value">${primaryFragrance.bestFor}</span>
                    </div>
                    <div class="detail">
                        <span class="detail__label">Key Notes:</span>
                        <div class="tags">
                            ${primaryFragrance.notes.map(note => `<span class="tag">${note}</span>`).join('')}
                        </div>
                    </div>
                    <div class="detail">
                        <span class="detail__label">Intensity:</span>
                        <div class="intensity">
                            <div class="intensity__bar" style="width: ${primaryFragrance.intensity * 20}%"></div>
                        </div>
                        <span class="intensity__label">
                            ${primaryFragrance.intensity <= 2 ? 'Light' : primaryFragrance.intensity <= 4 ? 'Moderate' : 'Strong'}
                        </span>
                    </div>
                    <div class="detail">
                        <span class="detail__label">Longevity:</span>
                        <div class="longevity">
                            <div class="longevity__bar" style="width: ${(primaryFragrance.longevity / 12) * 100}%"></div>
                        </div>
                        <span class="longevity__label">
                            ${primaryFragrance.longevity <= 4 ? '4-6 hours' : primaryFragrance.longevity <= 8 ? '6-10 hours' : '10+ hours'}
                        </span>
                    </div>
                </div>
                
                <div class="result-card__actions">
                    <button class="btn btn--primary" onclick="window.location.href='product.html?id=${primaryFragrance.id}'">
                        View Details
                    </button>
                    <button class="btn btn--secondary" onclick="addToCart(${primaryFragrance.id}, 1)">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        
        <div class="result-reasons">
            <h4>Why We Recommend This For You:</h4>
            <ul>
                <li>Matches your preferred <strong>${getScentFamilyName(userScentFamily)}</strong> scent profile</li>
                <li>Perfect for <strong>${getTimeOfDayName(userTime)}</strong> wear</li>
                <li>Ideal for <strong>${getSeasonName(userSeason)}</strong> season</li>
                <li>Matches your <strong>${getPersonalityName(userPersonality)}</strong> personality</li>
            </ul>
        </div>
        
        ${matchedFragrances.length > 1 ? `
        <div class="result-alternatives">
            <h4>You Might Also Like:</h4>
            <div class="alternative-products">
                ${matchedFragrances.slice(1).map(alt => `
                    <div class="alternative-product" onclick="window.location.href='product.html?id=${alt.id}'">
                        <img src="${alt.image || 'assets/images/perfume-placeholder.jpg'}" alt="${alt.name}">
                        <div class="alternative-product__info">
                            <h5>${alt.name}</h5>
                            <div class="price">$${alt.price.toFixed(2)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;
    
    // Add the HTML to the page
    resultContent.innerHTML = resultHTML;
    
    // Scroll to results
    document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth' });
    
    // Add result styles if not already added
    addResultStyles();
}

// Show quiz results
function showQuizResults() {
    // Show loading state
    showCalculatingResults();
    
    // Simulate calculation delay (in a real app, this would be an API call)
    setTimeout(() => {
        try {
            // Calculate matched fragrances (top 3 matches)
            const matchedFragrances = calculateFragranceMatch();
            
            if (!matchedFragrances || matchedFragrances.length === 0) {
                throw new Error('No matching fragrances found');
            }
            
            // Display results
            displayFinalResults(matchedFragrances);
            
            // Show result section
            document.getElementById('quiz-form').style.display = 'none';
            document.getElementById('quiz-result').style.display = 'block';
            
            // Update shop link with primary recommendation
            updateShopLink(matchedFragrances[0]);
            
            // Track quiz completion (for analytics)
            if (window.gtag) {
                gtag('event', 'quiz_complete', {
                    'event_category': 'engagement',
                    'event_label': 'Fragrance Quiz Completed',
                    'value': matchedFragrances[0].id
                });
            }
            
        } catch (error) {
            console.error('Error showing quiz results:', error);
            
            // Show error message
            const resultContent = document.getElementById('result-content');
            resultContent.innerHTML = `
                <div class="quiz-error">
                    <h3>Oops! Something went wrong</h3>
                    <p>We couldn't process your fragrance recommendation at this time. Please try again later.</p>
                    <button class="btn btn--primary" onclick="window.location.reload()">Try Again</button>
                </div>
            `;
            
            document.getElementById('quiz-form').style.display = 'none';
            document.getElementById('quiz-result').style.display = 'block';
        }
    }, 1500);
}

// Update shop link with recommendation
function updateShopLink(matchedFragrance) {
    const shopLink = document.querySelector('.result__actions .btn--primary');
    if (shopLink && matchedFragrance.id) {
        shopLink.href = `product.html?id=${matchedFragrance.id}`;
        shopLink.textContent = 'View This Fragrance';
    }
}

// Restart quiz
function restartQuiz() {
    // Reset quiz state
    quizConfig.currentQuestion = 1;
    quizConfig.answers = {};
    
    // Hide results and show form
    const quizForm = document.querySelector('.quiz__form');
    const quizResult = document.getElementById('quiz-result');
    
    if (quizForm) quizForm.style.display = 'block';
    if (quizResult) quizResult.style.display = 'none';
    
    // Reset questions
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        if (index === 0) {
            question.classList.add('active');
        } else {
            question.classList.remove('active');
        }
    });
    
    // Clear all radio buttons
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.checked = false;
    });
    
    // Reset navigation
    updateProgressBar();
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add loading animation during result calculation
function showCalculatingResults() {
    const resultContent = document.getElementById('result-content');
    if (resultContent) {
        resultContent.innerHTML = `
            <div class="quiz__loading">
                <div class="loading"></div>
                <div class="quiz__loading-text">Analyzing your preferences...</div>
            </div>
        `;
    }
}


// Add styles for quiz results
function addResultStyles() {
    const styleId = 'quiz-result-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .result-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .result-primary {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .result-image {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .result-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        .result-details {
            flex: 1;
        }
        .result-details h2 {
            color: #2c1810;
            font-size: 2rem;
            margin: 0.5rem 0 1rem;
        }
        .result-meta {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin: 1.5rem 0;
        }
        .price {
            font-size: 1.5rem;
            font-weight: 600;
            color: #8b5a2b;
        }
        .rating {
            color: #f8c537;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }
        .result-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        .btn--primary {
            background: #8b5a2b;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .btn--primary:hover {
            background: #6d4621;
            transform: translateY(-2px);
        }
        .btn--secondary {
            background: #f5f5f5;
            color: #2c1810;
            border: 1px solid #ddd;
            padding: 0.8rem 1.5rem;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .btn--secondary:hover {
            background: #e8e8e8;
            transform: translateY(-2px);
        }
        @media (min-width: 768px) {
            .result-primary {
                flex-direction: row;
                align-items: flex-start;
            }
            .result-image {
                width: 300px;
                margin: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize quiz on page load with animations
document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animation to quiz container
    const quizContainer = document.querySelector('.quiz__container');
    if (quizContainer) {
        quizContainer.style.opacity = '0';
        quizContainer.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            quizContainer.style.transition = 'all 0.8s ease';
            quizContainer.style.opacity = '1';
            quizContainer.style.transform = 'translateY(0)';
        }, 200);
    }
});