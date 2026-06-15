// Pexels imagery — verified IDs, free to use. Swap freely later.
// Helper builds a sized, compressed CDN url.
export function px(id: number, w = 1200, h?: number): string {
  const size = h ? `&w=${w}&h=${h}` : `&w=${w}`
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2${size}`
}

export const img = {
  podcaster: 6953867,      // woman recording a podcast with mic
  creatorDesk: 4348404,    // creative workspace, laptop + flowers
  makerDesk: 4974915,      // maker at desk, dual screens
  phoneTikTok: 5081930,    // hands holding phone, short-form
  laptopTop: 4065876,      // top-down hands on laptop, minimal
  rehearsal: 6896196,      // two creators laughing together
  focused: 7129713,        // person reviewing paperwork (the "before")
}

// Real human portraits for testimonials
export const faces = {
  maya: 7242908,    // smiling, curly hair, brick wall
  helena: 3756679,  // professional in white blazer
  kai: 4350057,     // portrait, cafe/apron
}
