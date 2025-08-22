import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }
    
    console.log('[clone-website] Cloning website:', url);
    
    // Simulate website cloning process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate scraped content
    const scrapedContent = {
      url,
      title: `Cloned from ${url}`,
      html: `<html><head><title>Cloned from ${url}</title></head><body><h1>Website cloned successfully</h1><p>This is a simulated clone of ${url}</p></body></html>`,
      metadata: {
        title: `Cloned from ${url}`,
        description: `A cloned version of ${url}`,
        ogSiteName: new URL(url).hostname,
        sourceURL: url,
        favicon: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`
      },
      timestamp: new Date().toISOString()
    };
    
    console.log('[clone-website] Website cloned successfully');
    
    return NextResponse.json({
      success: true,
      data: scrapedContent
    });
    
  } catch (error) {
    console.error('[clone-website] Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to clone website' 
      },
      { status: 500 }
    );
  }
}