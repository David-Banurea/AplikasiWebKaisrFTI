function calculateTotal() {
    const hargaBakso = 10000;
    const hargaMieAyam = 12000;
    const hargaSotoAyam = 15000;
    const hargaNasiRames = 9000;
    const hargaEsCampur = 7000;
    const hargaEsDawet = 7500;

    let jumlahBakso = document.getElementById('bakso').value || 0;
    let jumlahMieAyam = document.getElementById('mieAyam').value || 0;
    let jumlahSotoAyam = document.getElementById('sotoAyam').value || 0;
    let jumlahNasiRames = document.getElementById('nasiRames').value || 0;
    let jumlahEsCampur = document.getElementById('esCampur').value || 0;
    let jumlahEsDawet = document.getElementById('esDawet').value || 0;

    let total = (jumlahBakso * hargaBakso) + (jumlahMieAyam * hargaMieAyam) + (jumlahSotoAyam * hargaSotoAyam) + (jumlahNasiRames * hargaNasiRames) + (jumlahEsCampur * hargaEsCampur) + (jumlahEsDawet * hargaEsDawet);
    ;
    ;

    
    let diskon = 0;
    if (total > 200000) {
        diskon = total * 0.05;
    }

    let totalSetelahDiskon = total - diskon;

    document.getElementById('total').innerText = total;
    document.getElementById('diskon').innerText = diskon;
    document.getElementById('totalSetelahDiskon').innerText = totalSetelahDiskon;

    
    let bayar = document.getElementById('bayar').value || 0;
    let kembalian = bayar - totalSetelahDiskon;
    document.getElementById('kembalian').innerText = kembalian > 0 ? kembalian : 0; 
}

function clearForm() {
    document.getElementById('bakso').value = 0;
    document.getElementById('mieAyam').value = 0;
    document.getElementById('sotoAyam').value = 0;
    document.getElementById('nasiRames').value = 0;
    document.getElementById('esCampur').value = 0;
    document.getElementById('esDawet').value = 0;
    document.getElementById('bayar').value = 0;
    calculateTotal();
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('KASIR KAFE LK FTI UKSW', 20, 20);
    doc.setFontSize(12);
    doc.text('Kwitansi Pembelian', 20, 30);

   
    let bakso = document.getElementById('bakso').value;
    let mieAyam = document.getElementById('mieAyam').value;
    let sotoAyam = document.getElementById('sotoAyam').value;
    let nasiRames = document.getElementById('nasiRames').value;
    let esCampur = document.getElementById('esCampur').value;
    let esDawet = document.getElementById('esDawet').value;

    let data = [
        ['Bakso', `Rp. 10.000 x ${bakso}`, `Rp. ${10000 * bakso}`],
        ['Mie Ayam', `Rp. 12.000 x ${mieAyam}`, `Rp. ${12000 * mieAyam}`],
        ['Soto Ayam', `Rp. 15.000 x ${sotoAyam}`, `Rp. ${15000 * sotoAyam}`],
        ['Nasi Rames', `Rp. 9.000 x ${nasiRames}`, `Rp. ${9000 * nasiRames}`],
        ['Es Campur', `Rp. 7.000 x ${esCampur}`, `Rp. ${7000 * esCampur}`],
        ['Es Dawet', `Rp. 7.500 x ${esDawet}`, `Rp. ${7500 * esDawet}`],
    ];

    let total = document.getElementById('total').innerText;
    let diskon = document.getElementById('diskon').innerText;
    let totalSetelahDiskon = document.getElementById('totalSetelahDiskon').innerText;
    let bayar = document.getElementById('bayar').value;
    let kembalian = document.getElementById('kembalian').innerText;

    data.push(['Total', '', `Rp. ${total}`]);
    data.push(['Diskon', '', `Rp. ${diskon}`]);
    data.push(['Total Setelah Diskon', '', `Rp. ${totalSetelahDiskon}`]);
    data.push(['Bayar', '', `Rp. ${bayar}`]);
    data.push(['Kembalian', '', `Rp. ${kembalian}`]);

    doc.autoTable({
        head: [['Menu', 'Jumlah', 'Harga']],
        body: data,
        startY: 40,
        theme: 'striped'
    });

    doc.text('Terima Kasih Atas Kunjungan Anda!', 20, doc.lastAutoTable.finalY + 20);

    doc.save('KwitansiTransaksiAnda.pdf');
}

document.getElementById('bayar').addEventListener('input', calculateTotal);
