INSERT INTO Issue (title, description, status, createdAt, updatedAt) VALUES
('Login button not responding on mobile',
 'Users on iOS devices report that the **login button** does not trigger any action when tapped. After testing, it seems the issue only occurs on Safari with private browsing enabled. This likely relates to event listeners failing to bind correctly in certain environments. We need to validate whether this is caused by **recent frontend changes** to the authentication form or a caching issue.',
 'OPEN', '2025-01-02 09:15:23', '2025-01-02 09:45:11'),

('Image uploads failing intermittently',
 'Multiple customers have experienced failed uploads when attaching images to their profiles. The issue is intermittent and seems to be tied to file size. **Files over 5MB consistently fail**, while smaller images sometimes succeed. We should review both server-side limits and CDN upload handling. Logs show several `413 Payload Too Large` errors.',
 'IN_PROGRESS', '2025-01-03 14:10:11', '2025-01-04 08:32:19'),

('Checkout page crashes on Safari',
 'When users proceed to checkout on Safari, the page becomes unresponsive after clicking the **"Proceed to Payment"** button. Console logs indicate a JavaScript `TypeError` caused by a missing dependency. This issue is blocking sales for a significant portion of our customers. It appears related to the new **React checkout component** deployed last week.',
 'CLOSED', '2025-01-05 12:00:00', '2025-01-08 15:27:54'),

('Password reset emails not being delivered',
 'Customers attempting to reset their passwords are not receiving reset links. **SMTP logs show successful delivery to our provider**, but the messages are never received by Gmail accounts. This could indicate an SPF/DKIM misconfiguration introduced during the last DNS update. We need to investigate whether we are being flagged as spam.',
 'OPEN', '2025-01-06 08:47:13', '2025-01-06 09:02:33'),

('Analytics dashboard showing outdated sales data',
 'The **analytics dashboard** is not updating sales figures in real time. Reports from the finance team show discrepancies between the dashboard and Stripe reports. This issue appears to stem from the ETL pipeline, where certain jobs are failing silently. Data latency has reached over 24 hours in some cases, which undermines trust in reporting.',
 'IN_PROGRESS', '2025-01-07 16:11:29', '2025-01-08 10:25:40'),

('Mobile app crashing on Android 14',
 'Following the rollout of **Android 14**, users report that the mobile app crashes immediately upon launch. Crash logs point to a dependency on a deprecated permissions API. The app remains functional on older Android versions and iOS, but this issue is critical given the adoption of Android 14. A **hotfix release** is required.',
 'OPEN', '2025-01-09 07:21:15', '2025-01-09 07:59:02'),

('Two-factor authentication codes not expiring',
 'Users have discovered that previously issued **2FA codes remain valid** for several hours. This creates a serious security vulnerability, as codes are intended to expire after five minutes. Investigation suggests a bug in the timestamp validation logic. Until fixed, accounts remain at elevated risk of unauthorized access.',
 'CLOSED', '2025-01-10 11:32:18', '2025-01-15 14:44:56'),

('CSV exports missing column headers',
 'When admins export data from the dashboard as CSV, the files are missing column headers. This makes the data hard to interpret and causes issues when importing into **Excel or Google Sheets**. The export functionality previously worked as expected, so this regression likely stems from the recent migration of the reporting service.',
 'CLOSED', '2025-01-11 13:01:09', '2025-01-12 09:55:41'),

('Search results not respecting category filters',
 'When applying category filters to search results, the filters are ignored and the same results are returned. This bug is causing confusion among users and negatively affecting **product discoverability**. The issue appears to be a missing `WHERE` clause in the backend query logic introduced in the last refactor.',
 'CLOSED', '2025-01-12 10:10:44', '2025-01-12 11:21:00'),

('Dark mode styles not applied to new pages',
 "Newly deployed marketing pages do not respect the system\'s dark mode settings. Users have reported **blinding white backgrounds** when browsing at night. This indicates that the dark mode stylesheet was not included in the new build pipeline. The fix likely involves updating the global CSS configuration.",
 'IN_PROGRESS', '2025-01-13 17:22:31', '2025-01-14 09:33:12'),

('Push notifications failing on iOS devices',
 'Several iOS users report not receiving **push notifications**, even though Android devices work fine. Delivery receipts from Firebase suggest that notifications are leaving our servers, but APNs tokens might be invalid after the last certificate rotation. We need to recheck our Apple developer configuration and refresh device tokens.',
 'CLOSED', '2025-01-14 12:00:00', '2025-01-18 15:15:10'),

('Broken links in footer navigation',
 'The footer navigation contains links to deprecated pages. For example, the "Careers" link still points to an old subdomain. This hurts SEO and user trust. Updating the **footer component** across all templates should resolve this issue.',
 'OPEN', '2025-01-15 08:33:50', '2025-01-15 08:41:37'),

('File uploads timing out for large files',
 'When uploading files larger than 50MB, the upload process fails with a timeout error. This primarily affects users uploading **video files**. Investigation suggests that server timeout limits are too strict. Increasing timeout thresholds and adding progress feedback would greatly improve user experience.',
 'CLOSED', '2025-01-16 10:20:00', '2025-01-17 14:05:18'),

('Admin role unable to delete inactive users',
 'Administrators have reported being unable to delete inactive accounts. Attempts to delete result in a **permission denied error**. This is likely due to incorrect role-based access control configurations from the last update. Cleanup of inactive users is currently blocked until this is resolved.',
 'OPEN', '2025-01-17 09:11:42', '2025-01-17 11:02:19'),

('Search indexing job failing nightly',
 'The scheduled search indexing job fails silently each night, leaving the search index stale. As a result, **newly added products** are not discoverable until a manual reindex is run. This is caused by insufficient memory allocation in the cron job environment. A fix would involve provisioning more resources or breaking the job into smaller chunks.',
 'CLOSED', '2025-01-18 14:55:10', '2025-01-19 08:12:23'),

('Duplicate orders created during checkout',
 'Some customers are being **charged twice** when submitting orders. Logs show duplicate POST requests being processed due to missing idempotency keys. This is a critical financial issue and requires immediate implementation of proper transaction safeguards.',
 'IN_PROGRESS', '2025-01-19 11:00:00', '2025-01-21 09:23:51'),

('User avatars not saving after update',
 'Users attempting to update their profile picture report that the change does not persist. The uploaded image is stored on S3, but the user record is never updated in the database. This indicates a transactional failure in the **user service**. Adding retry logic may help.',
 'CLOSED', '2025-01-20 07:12:09', '2025-01-20 07:45:55'),

('Payment gateway sandbox credentials in production',
 'During a recent code audit, it was discovered that the production environment is still using **sandbox API keys** for one of the payment gateways. This explains why some transactions were not processed correctly. This is a severe misconfiguration that must be corrected immediately.',
 'CLOSED', '2025-01-21 16:40:11', '2025-01-22 10:05:37'),

('Notification preferences not saving',
 'Users report that toggling their notification preferences does not persist. Even after clicking **Save Settings**, the preferences reset after refreshing the page. Logs indicate that the API request is sent, but no changes are written to the database. This impacts user trust in account settings.',
 'CLOSED', '2025-01-22 08:20:15', '2025-01-23 11:14:44');

