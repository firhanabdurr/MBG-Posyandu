document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentSections = document.querySelectorAll('.content-section');
    const mainContent = document.getElementById('main-content');
    
    // Function to handle navigation
    const navigate = (targetId) => {
        sidebarItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${targetId}`);
        });
        contentSections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });
        mainContent.scrollTop = 0; // Scroll to top on new section
    };
    
    // Add click event to sidebar items
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            navigate(targetId);
            // Update URL hash for better history
            window.location.hash = targetId;
        });
    });

    // Check for hash in URL on initial load
    const initialTarget = window.location.hash ? window.location.hash.substring(1) : 'beranda';
    navigate(initialTarget);

    // Alur Distribusi Flowchart Interaction
    const flowDetails = {
        dapur: 'Tim SPPG (juru masak, pengemas) menyiapkan dan mengolah makanan sesuai standar kebersihan dan gizi pada dini hari/pagi hari. Makanan dikemas rapi dalam foodtray tertutup.',
        pengiriman: 'Mobil distribusi SPPG mengantar paket MBG ke titik kumpul yang disepakati (misal: Posyandu, rumah kader). Petugas distribusi SPPG akan menyerahkan paket kepada Ibu Kader.',
        penyaluran_kader: 'Ibu Kader menerima, memeriksa jumlah/kondisi paket, lalu menyalurkan paket MBG langsung ke rumah Penerima Manfaat (Ibu Hamil, Ibu Menyusui, Anak Balita).',
        makan_bersama: 'Kadang, akan ada kegiatan makan bersama di Posyandu sebulan sekali (sesuai jadwal Posyandu) sebagai sarana edukasi gizi dan mempererat kebersamaan.'
    };

    const flowchartSteps = document.querySelectorAll('.flowchart-step');
    const flowDetailContent = document.getElementById('flow-detail-content');

    flowchartSteps.forEach(step => {
        step.addEventListener('click', () => {
            const stepKey = step.dataset.step;
            // Visual feedback for active step
            flowchartSteps.forEach(s => s.classList.remove('bg-[#D9A443]', 'text-white'));
            step.classList.add('bg-[#D9A443]', 'text-white');
            // Update detail content
            flowDetailContent.innerHTML = `
                <h3 class="text-xl font-semibold text-[#0A2463] mb-4">Detail Tahapan: ${step.querySelector('h3').textContent}</h3>
                <p class="text-gray-600">${flowDetails[stepKey]}</p>
            `;
        });
    });

    // Set initial detail for flowchart
    if (flowchartSteps.length > 0) {
        flowchartSteps[0].click();
    }

    // Accordion for SOP Kader section
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordions first
            accordionHeaders.forEach(h => {
                h.nextElementSibling.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
                h.nextElementSibling.style.paddingTop = '0';
                h.nextElementSibling.style.paddingBottom = '0';
                h.querySelector('span').textContent = '▼';
            });
            
            // Open the clicked one if it was closed
            if (!isActive) {
                content.classList.add('active');
                content.style.paddingTop = '1.25rem';
                content.style.paddingBottom = '1.25rem';
                content.style.maxHeight = content.scrollHeight + "px";
                header.querySelector('span').textContent = '▲';
            }
        });
    });
});
