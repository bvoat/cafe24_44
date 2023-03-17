// <!-- Google Tag Manager -->
(function (w, d, s, l, i) {
		w[l] = w[l] || []; w[l].push({
			'gtm.start':
				new Date().getTime(), event: 'gtm.js'
		}); var f = d.getElementsByTagName(s)[0],
			j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
				'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-W7RM67F');
// <!-- End Google Tag Manager -->
// <!-- Twitter conversion tracking base code -->
	!function (e, t, n, s, u, a) {
		e.twq || (s = e.twq = function () {
			s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
		}, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = 'https://static.ads-twitter.com/uwt.js',
			a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
	}(window, document, 'script');
	twq('config', 'oe93j');

// <!-- End Twitter conversion tracking base code -->
// <!-- Twitter conversion tracking event code -->
  // Insert Twitter Event ID
  twq('event', 'tw-oe93j-oe9b7', {
    value: null, // use this to pass the value of the conversion (e.g. 5.00)
    currency: null, // use this to pass the currency of the conversion with an ISO 4217 code (e.g. ‘USD’)
    contents: [ // use this to pass an array of products or content
        // add all items to the array
        // use this for the first item
        {
          content_type: null,
          content_id: null,
          content_name: null,
          content_price: null,
          num_items: null,
          content_group_id: null
        },
        // use this for the second item
        {
          content_type: null,
          content_id: null,
          content_name: null,
          content_price: null,
          num_items: null,
          content_group_id: null
        }], 
    conversion_id: null, // use this to pass a unique ID for the conversion event for deduplication (e.g. order id '1a2b3c')
    email_address: null, // use this to pass a user’s email address
    phone_number: null // phone number in E164 standard
  });

// <!-- End Twitter conversion tracking event code -->