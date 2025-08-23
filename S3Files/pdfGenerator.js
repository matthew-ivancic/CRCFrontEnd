function generatePDF() {
    // Get the main content area
    const element = document.getElementById('inner');
    
    // Store current theme and force light mode for PDF generation
    // PDFs should always be in light mode for better readability and printing
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Store original styles
    const originalStyles = {
        width: element.style.width,
        maxWidth: element.style.maxWidth,
        padding: element.style.padding,
        margin: element.style.margin,
        fontSize: element.style.fontSize,
        lineHeight: element.style.lineHeight
    };
    
    // Apply PDF-optimized styles - more compact
    element.style.width = '8.5in';
    element.style.maxWidth = '8.5in';
    element.style.padding = '0.4in';
    element.style.margin = '0';
    element.style.fontSize = '10px';
    element.style.lineHeight = '1.2';
    
    // Temporarily hide elements we don't want in PDF
    const pdfButton = document.querySelector('#pdf');
    const themeToggle = document.querySelector('#themeToggle');
    const buttonGroup = document.querySelector('.button-group');
    const footer = document.querySelector('#ft');
    const originalPdfDisplay = pdfButton ? pdfButton.style.display : '';
    const originalThemeToggleDisplay = themeToggle ? themeToggle.style.display : '';
    const originalButtonGroupDisplay = buttonGroup ? buttonGroup.style.display : '';
    const originalFooterDisplay = footer ? footer.style.display : '';
    
    if (pdfButton) pdfButton.style.display = 'none';
    if (themeToggle) themeToggle.style.display = 'none';
    if (buttonGroup) buttonGroup.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Find the skills section and modify its layout
    const skillsSection = document.querySelector('.yui-gf:has(.talents)');
    const skillsFirst = skillsSection ? skillsSection.querySelector('.first') : null;
    const skillsContent = skillsSection ? skillsSection.querySelector('.yui-u') : null;
    
    // Store original layout styles
    const originalSkillsSectionStyles = {
        display: skillsSection ? skillsSection.style.display : '',
        flexDirection: skillsSection ? skillsSection.style.flexDirection : '',
        gap: skillsSection ? skillsSection.style.gap : '',
        marginBottom: skillsSection ? skillsSection.style.marginBottom : '',
        paddingBottom: skillsSection ? skillsSection.style.paddingBottom : ''
    };
    
    const originalSkillsFirstStyles = {
        flex: skillsFirst ? skillsFirst.style.flex : '',
        width: skillsFirst ? skillsFirst.style.width : '',
        marginBottom: skillsFirst ? skillsFirst.style.marginBottom : ''
    };
    
    const originalSkillsContentStyles = {
        flex: skillsContent ? skillsContent.style.flex : '',
        width: skillsContent ? skillsContent.style.width : ''
    };
    
    // Modify skills section to span full width and be more compact
    if (skillsSection) {
        skillsSection.style.display = 'block';
        skillsSection.style.flexDirection = 'column';
        skillsSection.style.gap = '4px';
        skillsSection.style.marginBottom = '8px';
        skillsSection.style.paddingBottom = '4px';
    }
    
    if (skillsFirst) {
        skillsFirst.style.flex = 'none';
        skillsFirst.style.width = '100%';
        skillsFirst.style.marginBottom = '2px';
    }
    
    if (skillsContent) {
        skillsContent.style.flex = 'none';
        skillsContent.style.width = '100%';
    }
    
    // Apply print styles to all elements
    const allElements = element.querySelectorAll('*');
    const originalElementStyles = new Map();
    
    allElements.forEach(el => {
        // Store original styles
        originalElementStyles.set(el, {
            fontSize: el.style.fontSize,
            lineHeight: el.style.lineHeight,
            margin: el.style.margin,
            padding: el.style.padding,
            gap: el.style.gap,
            display: el.style.display,
            gridTemplateColumns: el.style.gridTemplateColumns,
            width: el.style.width,
            marginRight: el.style.marginRight,
            verticalAlign: el.style.verticalAlign,
            flex: el.style.flex,
            marginBottom: el.style.marginBottom,
            paddingBottom: el.style.paddingBottom,
            fontWeight: el.style.fontWeight,
            borderBottom: el.style.borderBottom,
            color: el.style.color,
            fontStyle: el.style.fontStyle
        });
        
        // Apply PDF-optimized styles - more compact for single page
        if (el.tagName === 'H1') {
            el.style.fontSize = '22px';
            el.style.marginBottom = '6px';
        } else if (el.tagName === 'H2') {
            el.style.fontSize = '14px';
            el.style.marginBottom = '4px';
        } else if (el.tagName === 'H3') {
            el.style.fontSize = '12px';
            el.style.marginBottom = '3px';
        } else if (el.tagName === 'H4') {
            el.style.fontSize = '11px';
            el.style.marginBottom = '5px';
            // Preserve italic styling for project descriptions
            if (el.style.fontStyle === 'italic') {
                el.style.fontStyle = 'italic';
            }
        } else if (el.tagName === 'P') {
            el.style.fontSize = '10px';
            el.style.lineHeight = '1.2';
            el.style.marginBottom = '5px';
        } else if (el.tagName === 'LI') {
            el.style.fontSize = '10px';
            el.style.lineHeight = '1.2';
            el.style.marginBottom = '3px';
            // Remove any bold formatting from list items
            el.style.fontWeight = 'normal';
            el.style.borderBottom = 'none';
            el.style.color = '#555';
        } else if (el.classList.contains('yui-gf')) {
            el.style.marginBottom = '10px';
            el.style.paddingBottom = '5px';
            el.style.gap = '10px';
        } else if (el.classList.contains('job')) {
            el.style.marginBottom = '10px';
            el.style.paddingBottom = '5px';
        } else if (el.classList.contains('talents')) {
            // Make skills span full width with minimal spacing
            el.style.display = 'grid';
            el.style.gridTemplateColumns = '1fr 1fr';
            el.style.gap = '6px';
            el.style.width = '100%';
            el.style.marginBottom = '0';
        } else if (el.classList.contains('talent-left') || el.classList.contains('talent-center') || el.classList.contains('talent-right')) {
            // Make skill items very compact
            el.style.padding = '4px 6px';
            el.style.fontSize = '10px';
            el.style.margin = '0';
            el.style.border = '1px solid #ddd';
            el.style.backgroundColor = '#f9f9f9';
            el.style.width = '100%';
            el.style.boxSizing = 'border-box';
            el.style.lineHeight = '1.2';
        } else if (el.classList.contains('contact-info')) {
            el.style.fontSize = '10px';
        }
    });
    
    // Store original skills list items for restoration
    const originalSkillsItems = [];
    const skillsListItems = element.querySelectorAll('.talents li');
    skillsListItems.forEach((li, index) => {
        originalSkillsItems.push({
            element: li.cloneNode(true),
            parent: li.parentNode,
            index: index
        });
    });
    
    // Specifically handle skills list items to ensure no bold formatting
    skillsListItems.forEach(li => {
        // Temporarily change li to div to avoid CSS inheritance issues
        const div = document.createElement('div');
        div.innerHTML = li.innerHTML;
        div.style.fontWeight = 'normal';
        div.style.borderBottom = 'none';
        div.style.color = '#555';
        div.style.fontSize = '10px';
        div.style.lineHeight = '1.2';
        div.style.padding = '3px 0';
        div.style.margin = '0';
        div.style.textDecoration = 'none';
        
        // Replace the li with the div
        li.parentNode.replaceChild(div, li);
    });
    
    // Add CSS rules to override any existing styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .talents div {
            font-weight: normal !important;
            border-bottom: none !important;
            color: #555 !important;
            text-decoration: none !important;
            background: none !important;
        }
        .talents div:first-child {
            font-weight: normal !important;
            border-bottom: none !important;
            color: #555 !important;
            text-decoration: none !important;
        }
        .talents div::after,
        .talents div::before {
            display: none !important;
            content: none !important;
        }
    `;
    element.appendChild(styleSheet);
    
    // Configure PDF options
    const opt = {
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: 'Matthew_Ivancic_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: 816, // 8.5 inches * 96 DPI
            scrollX: 0,
            scrollY: 0
        },
        jsPDF: { 
            unit: 'in', 
            format: 'letter', 
            orientation: 'portrait',
            compress: true
        }
    };
    
    // Generate PDF
    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
            console.log('PDF generated successfully');
            // Restore all original styles
            restoreStyles();
        })
        .catch(error => {
            console.error('PDF generation failed:', error);
            // Restore all original styles even if there's an error
            restoreStyles();
        });
    
    function restoreStyles() {
        // Remove the temporary style sheet
        const tempStyleSheet = element.querySelector('style');
        if (tempStyleSheet) {
            tempStyleSheet.remove();
        }
        
        // Restore main element styles
        element.style.width = originalStyles.width;
        element.style.maxWidth = originalStyles.maxWidth;
        element.style.padding = originalStyles.padding;
        element.style.margin = originalStyles.margin;
        element.style.fontSize = originalStyles.fontSize;
        element.style.lineHeight = originalStyles.lineHeight;
        
        // Restore skills section layout
        if (skillsSection) {
            skillsSection.style.display = originalSkillsSectionStyles.display;
            skillsSection.style.flexDirection = originalSkillsSectionStyles.flexDirection;
            skillsSection.style.gap = originalSkillsSectionStyles.gap;
            skillsSection.style.marginBottom = originalSkillsSectionStyles.marginBottom;
            skillsSection.style.paddingBottom = originalSkillsSectionStyles.paddingBottom;
        }
        
        if (skillsFirst) {
            skillsFirst.style.flex = originalSkillsFirstStyles.flex;
            skillsFirst.style.width = originalSkillsFirstStyles.width;
            skillsFirst.style.marginBottom = originalSkillsFirstStyles.marginBottom;
        }
        
        if (skillsContent) {
            skillsContent.style.flex = originalSkillsContentStyles.flex;
            skillsContent.style.width = originalSkillsContentStyles.width;
        }
        
        // Restore all element styles
        allElements.forEach(el => {
            const original = originalElementStyles.get(el);
            if (original) {
                el.style.fontSize = original.fontSize;
                el.style.lineHeight = original.lineHeight;
                el.style.margin = original.margin;
                el.style.padding = original.padding;
                el.style.gap = original.gap;
                el.style.display = original.display;
                el.style.gridTemplateColumns = original.gridTemplateColumns;
                el.style.width = original.width;
                el.style.marginRight = original.marginRight;
                el.style.verticalAlign = original.verticalAlign;
                el.style.flex = original.flex;
                el.style.marginBottom = original.marginBottom;
                el.style.paddingBottom = original.paddingBottom;
                el.style.fontWeight = original.fontWeight;
                el.style.borderBottom = original.borderBottom;
                el.style.color = original.color;
                el.style.fontStyle = original.fontStyle;
            }
        });
        
        // Restore display states
        if (pdfButton) pdfButton.style.display = originalPdfDisplay;
        if (themeToggle) themeToggle.style.display = originalThemeToggleDisplay;
        if (buttonGroup) buttonGroup.style.display = originalButtonGroupDisplay;
        if (footer) footer.style.display = originalFooterDisplay;

        // Restore original skills list items
        originalSkillsItems.forEach(item => {
            const currentDiv = item.parent.querySelector('div');
            if (currentDiv) {
                item.parent.replaceChild(item.element, currentDiv);
            }
        });
        
        // Restore original theme
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
}
