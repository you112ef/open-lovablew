export async function onRequestPost(context: any) {
  try {
    const { response, isEdit, packages, sandboxId } = await context.request.json();
    
    if (!response) {
      return new Response(
        JSON.stringify({ success: false, error: 'Response is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    console.log('[apply-ai-code] Applying code...');
    console.log('[apply-ai-code] Is edit:', isEdit);
    console.log('[apply-ai-code] Packages:', packages);
    console.log('[apply-ai-code] Sandbox ID:', sandboxId);
    
    // Create a readable stream for real-time response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send start message
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'start' })}\n\n`)
          );
          
          // Simulate analysis phase
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ 
              type: 'step', 
              message: 'Analyzing code structure...',
              packages: packages || []
            })}\n\n`)
          );
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Simulate package installation if needed
          if (packages && packages.length > 0) {
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ 
                type: 'step', 
                message: `Installing packages: ${packages.join(', ')}...`,
                packages: packages
              })}\n\n`)
            );
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Send package progress
            for (const pkg of packages) {
              controller.enqueue(
                new TextEncoder().encode(`data: ${JSON.stringify({ 
                  type: 'package-progress', 
                  package: pkg,
                  status: 'installed'
                })}\n\n`)
              );
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }
          
          // Simulate file creation
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ 
              type: 'step', 
              message: 'Creating files...',
              filesGenerated: ['src/App.jsx', 'src/index.css']
            })}\n\n`)
          );
          
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Simulate code application
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ 
              type: 'step', 
              message: 'Applying code changes...',
              filesGenerated: ['src/App.jsx', 'src/index.css']
            })}\n\n`)
          );
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Send completion
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ 
              type: 'complete',
              message: 'Code applied successfully!',
              files: ['src/App.jsx', 'src/index.css'],
              sandboxId: sandboxId
            })}\n\n`)
          );
          
        } catch (error) {
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ type: 'error', error: error instanceof Error ? error.message : 'Unknown error' })}\n\n`)
          );
        } finally {
          controller.close();
        }
      }
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('[apply-ai-code] Error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to apply code' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}