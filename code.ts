// Main async function to handle font loading
async function createPagesWithGradient() {
  const pages = [
    'Authentications', 
    'Home',
  ];

  // Load font first
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  } catch (error) {
    // Fallback to default font if Inter Bold is not available
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  }

  for (const pageName of pages) {
    const newPage = figma.createPage();
    newPage.name = pageName;
    
    // Create main frame
    const frame = figma.createFrame();
    frame.name = 'Created by MR. R0B0T';
    frame.resize(1920, 1080);
    frame.x = 0;
    frame.y = 0;
    
    // Create gradient background rectangle
    const gradientRect = figma.createRectangle();
    gradientRect.name = 'Gradient Background';
    gradientRect.resize(1920, 1080);
    gradientRect.x = 0;
    gradientRect.y = 0;
    
    // Create minimalistic gradient (subtle dark to light)
    const gradientPaint: GradientPaint = {
      type: 'GRADIENT_LINEAR',
      gradientTransform: [
        [1, 0, 0],
        [0, 1, 0]
      ],
      gradientStops: [
        {
          color: { r: 0.1, g: 0.1, b: 0.15, a: 1 }, // Dark blue-gray
          position: 0
        },
        {
          color: { r: 0.15, g: 0.15, b: 0.2, a: 1 }, // Slightly lighter
          position: 1
        }
      ]
    };
    
    gradientRect.fills = [gradientPaint];
    
    // Create text element
    const textNode = figma.createText();
    textNode.name = 'MR. R0B0T Text';
    
    // Set font (use loaded font or fallback)
    try {
      textNode.fontName = { family: "Inter", style: "Bold" };
    } catch (error) {
      textNode.fontName = { family: "Roboto", style: "Regular" };
    }
    
    textNode.characters = "CREATED BY MR. R0B0T";
    textNode.fontSize = 72;
    textNode.letterSpacing = { unit: "PIXELS", value: 8 };
    
    // Position text in center (calculate after setting text properties)
    textNode.x = (1920 - textNode.width) / 2;
    textNode.y = (1080 - textNode.height) / 2;
    
    // Style the text with solid white fill
    const textSolidPaint: SolidPaint = {
      type: 'SOLID',
      color: { r: 1, g: 1, b: 1 } // Pure white
    };
    
    textNode.fills = [textSolidPaint];
    
    // Add text shadow effect
    const dropShadowEffect: DropShadowEffect = {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.5 },
      offset: { x: 4, y: 4 },
      radius: 8,
      visible: true,
      blendMode: 'NORMAL'
    };
    
    textNode.effects = [dropShadowEffect];
    
    // Add elements to frame
    frame.appendChild(gradientRect);
    frame.appendChild(textNode);
    
    // Add frame to page
    newPage.appendChild(frame);
  }
}

// Execute the main function and close plugin
createPagesWithGradient().then(() => {
  figma.closePlugin();
}).catch((error) => {
  console.error('Error creating pages:', error);
  figma.closePlugin();
});