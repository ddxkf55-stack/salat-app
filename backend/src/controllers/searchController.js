exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false,
        error: 'Query parameter is required' 
      });
    }

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    res.json({
      success: true,
      data: {
        query,
        redirectUrl: searchUrl,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in search:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};