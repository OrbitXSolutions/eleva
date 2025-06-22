const TermsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Terms of Service</h1>
      <p className="mb-3">
        Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be
        bound by the following terms and conditions of use, which together with our privacy policy govern [website's
        name]'s relationship with you in relation to this website. If you disagree with any part of these terms and
        conditions, please do not use our website.
      </p>
      <ol className="list-decimal list-inside mb-5">
        <li>
          <strong>Acceptance of Terms</strong>
          <p>
            By accessing and using this website, you agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our services.
          </p>
        </li>
        <li>
          <strong>Description of Service</strong>
          <p>
            We provide [description of services]. We reserve the right to modify or discontinue any aspect of the
            service at any time.
          </p>
        </li>
        <li>
          <strong>User Conduct</strong>
          <p>
            You agree to use the website only for lawful purposes and in a way that does not infringe the rights of,
            restrict or inhibit anyone else's use and enjoyment of the website.
          </p>
        </li>
        <li>
          <strong>Intellectual Property</strong>
          <p>
            The content, layout, design, data, graphics, and other materials on this website are protected by
            intellectual property laws. You may not reproduce, distribute, or create derivative works without our
            express written permission.
          </p>
        </li>
        <li>
          <strong>Disclaimer of Warranties</strong>
          <p>
            The website is provided on an "as is" and "as available" basis. We make no warranties, express or implied,
            regarding the website's operation or the information, content, or materials included on the website.
          </p>
        </li>
        <li>
          <strong>Limitation of Liability</strong>
          <p>
            We will not be liable for any damages of any kind arising from the use of this website, including, but not
            limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>
        </li>
        <li>
          <strong>Governing Law</strong>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of [Your
            Jurisdiction].
          </p>
        </li>
        <li>
          <strong>Changes to Terms</strong>
          <p>
            We reserve the right to modify these Terms of Service at any time. Your continued use of the website after
            any such changes constitutes your acceptance of the new Terms of Service.
          </p>
        </li>
      </ol>
      <p>If you have any questions about these Terms of Service, please contact us at [Your Contact Information].</p>
    </div>
  )
}

export default TermsPage
