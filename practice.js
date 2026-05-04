document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.dashboard-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find target pane and add active class
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});