export function buildETicketHtml(booking, destination) {
  const date = booking.bookedAt ? new Date(booking.bookedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  const barcode = (booking.id || 'SFW-XXXX').replace('SFW-', '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>E-Ticket ${booking.id} | Safarnow</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; background: #eef3f8; padding: 24px; color: #172B3A; }
  .ticket { max-width: 760px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(11,45,77,.12); }
  .hero { background: linear-gradient(120deg, #0B2D4D, #1688D4); color: #fff; padding: 28px 32px; display: flex; justify-content: space-between; align-items: center; }
  .brand { font-size: 22px; font-weight: 800; letter-spacing: -.5px; }
  .brand span { color: #38BDF8; }
  .tag { font-size: 11px; opacity: .8; letter-spacing: 2px; text-transform: uppercase; }
  .etag { background: #fff; color: #1688D4; font-weight: 700; font-size: 12px; padding: 8px 14px; border-radius: 999px; letter-spacing: 1px; }
  .body { padding: 32px; }
  .dest { display: flex; align-items: center; gap: 8px; font-size: 26px; font-weight: 800; margin-bottom: 6px; }
  .dest small { font-size: 12px; font-weight: 400; color: #64748B; }
  .meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0; }
  .meta div { background: #F5F9FC; border-radius: 12px; padding: 14px 16px; }
  .meta label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1.4px; color: #64748B; margin-bottom: 4px;}
  .meta strong { font-size: 15px; color: #172B3A; }
  .divider { border-top: 2px dashed #CBD5E1; margin: 24px 0; position: relative; }
  .divider:before, .divider:after { content: ''; position: absolute; top: -9px; width: 16px; height: 16px; border-radius: 50%; background: #eef3f8; }
  .divider:before { left: -40px; } .divider:after { right: -40px; }
  .price-row { display: flex; justify-content: space-between; align-items: center; }
  .price-row .label { color: #64748B; font-size: 13px; }
  .price-row .amt { font-size: 26px; font-weight: 800; color: #0B2D4D; }
  .price-row .orig { font-size: 13px; color: #64748B; text-decoration: line-through; }
  .barcode { display: flex; gap: 3px; align-items: center; justify-content: center; background: #fff; border: 2px solid #0B2D4D; border-radius: 12px; padding: 14px 16px; margin-top: 24px; }
  .bar { width: 3px; background: #0B2D4D; border-radius: 1px; }
  .bc-text { text-align: center; margin-top: 8px; font-size: 13px; letter-spacing: 6px; font-weight: 700; color: #0B2D4D; }
  .foot { text-align: center; color: #94A3B8; font-size: 11px; padding: 0 32px 28px; line-height: 1.6; }
  .status { display: inline-flex; align-items: center; gap: 6px; background: #16A34A; color: #fff; font-weight: 700; font-size: 12px; padding: 6px 12px; border-radius: 999px; }
  .print { text-align: center; margin: 20px auto 0; max-width: 760px; }
  .print button { background: #1688D4; color: #fff; border: 0; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 12px; cursor: pointer; }
  @media print { body { background: #fff; padding: 0; } .print { display: none; } .ticket { box-shadow: none; border-radius: 0; } }
</style>
</head>
<body>
  <div class="ticket">
    <div class="hero">
      <div>
        <div class="brand">Safar<span>now</span></div>
        <div class="tag">AI Powered Smart Tourism</div>
      </div>
      <div style="text-align:right">
        <div class="etag">MOBILE E-TICKET</div>
        <div class="status" style="margin-top:8px">&#10003; CONFIRMED</div>
      </div>
    </div>
    <div class="body">
      <div class="dest">
        &#9992; ${booking.destinationName || 'Your Trip'}
        <small>${destination?.state ? destination.state + ', ' + destination.country : ''}</small>
      </div>
      <div class="meta">
        <div><label>Booking ID</label><strong>${booking.id || '—'}</strong></div>
        <div><label>Booked On</label><strong>${date}</strong></div>
        <div><label>Package</label><strong>${booking.packageName || 'Custom Trip'}</strong></div>
        <div><label>Hotel</label><strong>${booking.hotelName || 'N/A'}</strong></div>
        <div><label>Traveler</label><strong>${booking.travelerName || '—'}</strong></div>
        <div><label>Travellers</label><strong>${booking.travelers || 1}</strong></div>
        <div><label>Check-in</label><strong>${booking.checkIn || 'TBD'}</strong></div>
        <div><label>Check-out</label><strong>${booking.checkOut || 'TBD'}</strong></div>
        <div><label>Email</label><strong>${booking.email || '—'}</strong></div>
        <div><label>Phone</label><strong>${booking.phone || '—'}</strong></div>
      </div>
      <div class="divider"></div>
      <div class="price-row">
        <div>
          <div class="label">Total Amount Paid</div>
          ${booking.packageName ? '<div class="orig">' + (booking.taxes ? 'incl. taxes & fees' : '') + '</div>' : ''}
        </div>
        <div class="amt">₹${(booking.total || 0).toLocaleString('en-IN')}</div>
      </div>
      <div class="barcode">
        ${Array.from({ length: 28 }, (_, i) => `<div class="bar" style="height:${i % 4 === 0 ? 38 : i % 3 === 0 ? 30 : 44}px"></div>`).join('')}
      </div>
      <div class="bc-text">${barcode}</div>
    </div>
    <p class="foot">This is a computer-generated e-ticket. Present this on arrival. For support contact support@safarnow.com · Free cancellation up to 48 hours before check-in.</p>
  </div>
  <div class="print"><button onclick="window.print()">Print / Save as PDF</button></div>
  <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 400); };</script>
</body>
</html>`;
}

export function downloadETicket(booking, destination) {
  const html = buildETicketHtml(booking, destination);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `safarnow-eticket-${(booking.id || 'ticket').toLowerCase()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}