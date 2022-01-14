export const HtmlMail = ({name, contacts, message}) => {
    return (
        <>
            <div
                style="
        box-sizing: border-box;
        width: 400px;
        font-size: 20px;
        background-color: #000;
      "
            >
                <div>
                    <img
                        style="background-size: cover; width: 100%;"
                        src="https://f.vividscreen.info/soft/c79bb3903c454eb6111ca201e03694e9/Mountain-Lion-Nyan-Cat-320x240.jpg"
                        alt="nyanCat"
                    />
                </div>
                <div
                    style="
          color: cornsilk;
          padding-bottom: 8px;
          box-sizing: content-box;
          overflow: hidden;
          word-wrap: break-word;
        "
                >
                    <div
                        style="
            padding: 5px;
            box-shadow: 0 4px 4px #b4b7a7, 0 1px 2px #d2cbcb;
          "
                    >
                        name: ${name}
                    </div>
                    <div
                        style="
            padding: 5px;
            box-shadow: 0 4px 4px #b4b7a7, 0 1px 2px #d2cbcb;
          "
                    >
                        contacts: ${contacts}
                    </div>
                    <div
                        style="
            padding: 5px;
            box-shadow: 0 4px 4px #b4b7a7, 0 1px 2px #d2cbcb;
          "
                    >
                        message:${message}
                    </div>
                </div>
            </div>
        </>
    )
}