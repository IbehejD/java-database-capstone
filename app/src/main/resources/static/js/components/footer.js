// Function to render the footer content into the page
function renderFooter() {
  // Select the footer element from the DOM by its ID
  const footer = document.getElementById("footer");

  // If the footer element does not exist, exit the function
  if (!footer) return;

  // Set the inner HTML of the footer element to include the footer content
  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-container">
      
        <!-- Logo and copyright -->
        <div class="footer-logo">
          <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo" />
          <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
        </div>

        <!-- Links section -->
        <div class="footer-links">
        
          <!-- Column: Company -->
          <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>

          <!-- Column: Support -->
          <div class="footer-column">
            <h4>Support</h4>
            <a href="#">Account</a>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>

          <!-- Column: Legals -->
          <div class="footer-column">
            <h4>Legals</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Licensing</a>
          </div>

        </div> <!-- /.footer-links -->

      </div> <!-- /.footer-container -->
    </footer>
  `;
}

// Call the renderFooter function to populate the footer in the page
