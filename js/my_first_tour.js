function isFunction(possibleFunction) {
  return typeof(possibleFunction) === typeof(Function);
}

// Find which tab is currently active
function findActiveTab() {
  var tab;
  $( "#top-nav li" ).each(function() {
    if ( $( this ).hasClass( "active" ) ) {
      tab = $( this ).attr('id');
    }
  });
  return tab;
}

var wasActive = findActiveTab();

function removeActiveFromTabs() {
  $( "#top-nav li" ).each(function() {
    $( this ).removeClass( "active" );
  });
}

// Define the tour!
var tour = {
  id: "hello-hopscotch",
  steps: [
    {
      title: "Navigation improvements!",
      content: "We've improved the navigation for the Docker documentation!<br /><br /><b>This tour takes less than a minute.</b><br /><br />It highlights and explains each improvement, then returns you to the current page.<br /><br />You'll learn about:<br /><ul><li>New top navigation</li><li>Left-hand navigation</li><li>Feedback links</li><li>In-page navigation</li></ul>",
      target: "main-content",
      placement: "top",
      xOffset: "center",
      yOffset: "400px",
      width: "400px",
      onShow: function () {
        // Hide the arrow on the first navigation bubble
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
      },
      multipage: "true",
      onNext: function() {
        window.location = "/engine/swarm/admin_guide/";
      }
    },
    {
      title: "Top Navigation",
      content: "Use the top navigation to discover the types of content available.",
      target: "top-nav-container",
      placement: "bottom",
      arrowOffset: "560px",
      width: "570px",
      onShow: function () {
        // Show the arrow again
        $('.hopscotch-bubble-arrow-container').css('visibility', 'visible');
      }
    },
    {
      title: "Guides",
      content: "Use the <b>Guides</b> to learn how to install, configure, and manage Docker as a whole, or to view the docs archives for previous Docker versions.",
      target: "top-nav",
      placement: "bottom",
      width: "570px",
      onShow: function() {
        removeActiveFromTabs();
        $('#guides').addClass('active');
      }
    },
    {
      title: "Product Manuals",
      content: "Use the <b>Product Manuals</b> to learn detailed information about a specific Docker product, such as Docker Cloud or UCP.",
      target: "top-nav",
      placement: "bottom",
      width: "570px",
      arrowOffset: "140px",
      onShow: function() {
        removeActiveFromTabs();
        $('#manuals').addClass('active');
      }
    },
    {
      title: "Glossary",
      content: "Use the <b>Glossary</b> to quickly define and learn about terminology specific to Docker.",
      target: "top-nav",
      placement: "bottom",
      width: "570px",
      arrowOffset: "280px",
      onShow: function() {
        removeActiveFromTabs();
        $('#glossary').addClass('active');
      }
    },
    {
      title: "Reference",
      content: "Use the <b>Reference</b> to go straight to reference information about Docker, such as API and CLI reference topics.",
      target: "top-nav",
      placement: "bottom",
      width: "570px",
      arrowOffset: "390px",
      onShow: function() {
        removeActiveFromTabs();
        $('#reference').addClass('active');
      }
    },
    {
      title: "Samples",
      content: "Use the <b>Samples</b> to learn about Docker using self-paced tutorials, labs, and sample Docker applications.",
      target: "top-nav",
      placement: "bottom",
      width: "570px",
      arrowOffset: "490px",
      onShow: function() {
        // Set class `active` on the samples section
        removeActiveFromTabs();
        $('#samples').addClass('active');
      },
      onNext: function() {
        removeActiveFromTabs();
        $( "#" + wasActive ).addClass('active');
      }
    },
    {
      title: "Left Navigation",
      content: "Use the left navigation for a structured view of content within a top-level category.",
      target: "left-nav",
      placement: "right",
      yOffset: "100px",
      arrowOffset: "center"
    },
    {
      title: "Feedback Links",
      content: "Use the feedback links to edit the page, provide feedback, or find out how to get support.",
      target: "feedback-links",
      placement: "left",
      arrowOffset: "center"
    },
    {
      title: "In-page navigation",
      content: "Use the in-page navigation links to jump to specific areas within the page you are viewing.<br />This is especially helpful on pages with a lot of content.",
      target: "side-toc",
      placement: "left",
      yOffset: "100px",
      arrowOffset: "center"
    },
    {
      title: "The tour is complete!",
      content: "Thanks for checking out the new navigation features. You will now be returned to where you started.",
      target: "main-content",
      placement: "top",
      xOffset: "center",
      yOffset: "300px",
      onShow: function () {
        // Hide the arrow on the first navigation bubble
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
      }
    }
  ],
  showPrevButton: true,
  scrollTopMargin: 200,
  skipIfNoElement: false,
  onEnd: function() {
    // reset the active tab if they bail before it is done
    removeActiveFromTabs();
    $( "#" + wasActive ).addClass('active');
    // Return them back where they came from when the tour ends
    hopscotch.endTour(true);
    window.location = document.referrer;
  },
  onClose: function() {
    // reset the active tab if they bail before it is done
    removeActiveFromTabs();
    $( "#" + wasActive ).addClass('active');
    // Return them back where they came from if they end the tour early
    hopscotch.endTour(true);
    window.location = document.referrer;
  }
};

// Start tour if button is pressed
$("#start-tour").click(function(){
  hopscotch.endTour(true);
  hopscotch.startTour(tour);
  ga('send', {
    hitType: 'event',
    eventCategory: 'Tour',
    eventAction: 'play',
    eventLabel: 'Navigation Tour'
  });
});

// Resume tour if already in progress
if (hopscotch.getState() != null) {
  hopscotch.startTour(tour, hopscotch.getState());
}
