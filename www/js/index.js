(function() {
  var questions = [  {
    question: "Which of the following is a valid type of function javascript supports?",
    choices: ["named function","anonymous function","Both of the above.","None of above"],
    correctAnswer: 2
  }, {
    question: "Which of the following type of variable takes precedence over other if names are same?",
    choices: ["global variable","local variable","Both of the above.","None of above"],
    correctAnswer: 1
  }, {
    question: "Which of the following jQuery selector select elements whose css class is some-class?",
    choices: ["$('some-class')","$('#some-class')","$('.some-class')","None of Above"],
    correctAnswer: 2
  }, {
    question: "Which of the following jQuery method gets attributes of an element?",
    choices: ["attr()","getAttr()","getAttributes()","None of the above."],
    correctAnswer: 0
  }, {
    question: "Which of the following jQuery method checks the current selection against an expression?",
   choices: ["getIs( selector )","is( selector )","checkIs( selector )","None of the above."],
   correctAnswer: 1
  }, {
    question: "Which of the following jQuery method searches for descendent elements that match the specified selectors?",
    choices: ["locate( selector )","find( selector)","search( selector )","None of above"],
    correctAnswer: 1
  }, {
    question: "Which of the following jQuery method gets the height property of an element?",
    choices: ["getCSSHeight( )","getHeight( )","height( )","None of the above."],
    correctAnswer: 2
  }, {
    question: "Which of the following jQuery method returns the top and left position of an element relative to its offset parent?",
    choices: ["offset( )","offsetParent( )","position( )","None of the above."],
    correctAnswer: 2
  }, {
    question: "Which of the following jQuery method stops the rest of the event handlers from being executed?",
    choices: ["preventDefault( )","stopImmediatePropagation( )","stopPropagation( )","None of the above."],
    correctAnswer: 1
  }, {
    question: "Which of the following jQuery method can be used to attach a function to be executed whenever an AJAX request is sent?",
    choices: ["ajaxStart( callback )","ajaxComplete( callback )","ajaxSend( callback )","ajaxError(callback)"],
    correctAnswer: 2
  },{
    question: "Which of the following selector matches a element based on its class attribute?",
    choices: ["The Type Selector","The Universal Selector","The Descendant Selector","The Class Selector"],
    correctAnswer: 3
  }, {
    question: "Which of the following defines a measurement as a percentage relative to another value, typically an enclosing element?",
    choices: ["%","cm","em","ex"],
    correctAnswer: 0
  }, {
    question: "Which of the following is correct about RGB Values format of CSS colors?",
    choices: ["This color value is specified using the rgb( ) property.","This property takes three values, one each for red, green, and blue.","The value can be an integer between 0 and 255 or a percentage.","All of Above"],
    correctAnswer: 3
  }, {
    question: "Which of the following property is used to control the repetition of an image in the background?",
    choices: ["background-color","background-image","background-repeat","background-position"],
    correctAnswer: 2
  }, {
    question: "Which of the following property is used to set the text direction?",
    choices: ["color","direction","letter-spacing","word-spacing"],
    correctAnswer: 1
  }, {
    question: "Which of the following property is used to set the width of an image border?",
    choices: ["border","height","width","-moz-opacity"],
    correctAnswer: 0
  }, {
    question: "Which of the following property specifies whether a border should be solid, dashed line, double line, or one of the other possible values?",
    choices: [":border-color",":border-style",":border-width",":border-bottom-color"],
    correctAnswer: 1
  }, {
    question: "Which of the following property changes the style of left border?",
    choices: [":border-bottom-style",":border-top-style",":border-left-style",":border-right-style"],
    correctAnswer: 2
  }, {
    question: "Which of the following property allows you to control the shape or appearance of the marker of a list?",
    choices: ["list-style-type","list-style-position","list-style-image","list-style"],
    correctAnswer: 0
  },
   {
    question: "Which of the following property serves as shorthand for the padding properties?",
    choices:["padding","padding-top","padding-left","padding-right"],
   correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please select any option to continue...');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ol type="A">');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Result: ' + numCorrect + ' / ' +
                 questions.length);
    return score;
  }
})();