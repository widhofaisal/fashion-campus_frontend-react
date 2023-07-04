import Head from "next/head";

function WebsiteHead(props) {
  const WebsiteTitle = props.title ? props.title : "Startup Campus Website";
  const WebsiteDesc = props.desc ? props.desc : "Startup Campus Website";
  const WebsiteAuthor = "William Onnyxiforus Purnomo";

  return (
    <Head>
      <title>{WebsiteTitle}</title>
      <meta name="description" content={WebsiteDesc} />
      <meta name="author" content={WebsiteAuthor} />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
    </Head>
  );
}

export default WebsiteHead;
