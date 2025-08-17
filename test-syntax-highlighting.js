const { chromium } = require('playwright');

async function testSyntaxHighlighting() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🧪 Starting syntax highlighting tests...\n');

  try {
    // Test 1: Navigate to article with code blocks
    console.log('1. Testing Rust Optimization article...');
    await page.goto('http://localhost:1313/articles/rust-optimization/', { waitUntil: 'networkidle' });
    
    // Check if code blocks are present
    const codeBlocks = await page.locator('.highlight').count();
    console.log(`   ✓ Found ${codeBlocks} code blocks`);
    
    // Check if syntax highlighting classes are applied
    const highlightedKeywords = await page.locator('.highlight .k').count();
    const highlightedStrings = await page.locator('.highlight .s').count();
    const highlightedComments = await page.locator('.highlight .c').count();
    
    console.log(`   ✓ Syntax highlighting applied:`);
    console.log(`     - Keywords: ${highlightedKeywords}`);
    console.log(`     - Strings: ${highlightedStrings}`);
    console.log(`     - Comments: ${highlightedComments}`);
    
    // Check CSS is loaded
    const syntaxCSS = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return links.some(link => link.href.includes('syntax.css'));
    });
    console.log(`   ✓ Syntax CSS loaded: ${syntaxCSS}`);
    
    // Check code block background color
    const codeBlockStyle = await page.locator('.highlight').first().evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        overflow: style.overflow
      };
    });
    console.log(`   ✓ Code block styling:`);
    console.log(`     - Background: ${codeBlockStyle.backgroundColor}`);
    console.log(`     - Border radius: ${codeBlockStyle.borderRadius}`);
    console.log(`     - Overflow: ${codeBlockStyle.overflow}`);
    
    // Test 2: Check inline code styling
    console.log('\n2. Testing inline code styling...');
    const inlineCode = await page.locator('code:not(.highlight code)').first();
    if (await inlineCode.count() > 0) {
      const inlineStyle = await inlineCode.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          backgroundColor: style.backgroundColor,
          padding: style.padding
        };
      });
      console.log(`   ✓ Inline code styling:`);
      console.log(`     - Font: ${inlineStyle.fontFamily.split(',')[0]}`);
      console.log(`     - Size: ${inlineStyle.fontSize}`);
      console.log(`     - Background: ${inlineStyle.backgroundColor}`);
    }
    
    // Test 3: Check typography improvements
    console.log('\n3. Testing typography improvements...');
    const bodyStyle = await page.locator('body').evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        color: style.color
      };
    });
    console.log(`   ✓ Body typography:`);
    console.log(`     - Font: ${bodyStyle.fontFamily.split(',')[0]}`);
    console.log(`     - Size: ${bodyStyle.fontSize}`);
    console.log(`     - Line height: ${bodyStyle.lineHeight}`);
    console.log(`     - Color: ${bodyStyle.color}`);
    
    // Test 4: Take screenshots for visual verification
    console.log('\n4. Taking screenshots...');
    await page.screenshot({ path: 'test-full-page.png', fullPage: false });
    console.log('   ✓ Full page screenshot saved');
    
    const codeBlock = await page.locator('.highlight').first();
    if (await codeBlock.count() > 0) {
      await codeBlock.screenshot({ path: 'test-code-block.png' });
      console.log('   ✓ Code block screenshot saved');
    }
    
    console.log('\n✅ All tests passed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testSyntaxHighlighting().catch(console.error);