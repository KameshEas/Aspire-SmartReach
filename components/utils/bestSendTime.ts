export type MessageRecord = { createdAt?: string };

export function getBestSendTime(messages: MessageRecord[] = []) {
  try {
    const counts = new Array(24).fill(0);
    messages.forEach((m) => {
      if (!m || !m.createdAt) return;
      const d = new Date(m.createdAt);
      if (isNaN(d.getTime())) return;
      counts[d.getHours()]++;
    });

    const total = counts.reduce((a, b) => a + b, 0);
    if (total < 5) {
      // not enough history; recommend 10 AM local
      const d = new Date();
      d.setHours(10, 0, 0, 0);
      return { hour: 10, label: d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), reason: 'Default recommended time' };
    }

    let bestHour = 10;
    let bestCount = -1;
    counts.forEach((c, h) => {
      if (c > bestCount) {
        bestCount = c;
        bestHour = h;
      }
    });

    const d = new Date();
    d.setHours(bestHour, 0, 0, 0);
    return { hour: bestHour, label: d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), reason: 'Based on your activity' };
  } catch (e) {
    const d = new Date();
    d.setHours(10, 0, 0, 0);
    return { hour: 10, label: d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), reason: 'Default recommended time' };
  }
}

export default getBestSendTime;
