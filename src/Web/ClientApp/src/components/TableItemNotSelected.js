import React from "react";

import EyesEmoji from "../Elements/svgs/EyesEmoji";
import SelectionIllustration from "../Elements/svgs/SelectionIllustration";

function NotSelected() {
  return (
    <div class="data-details col d-flex justify-content-start align-items-center flex-column p-0">
      <section class="member-summary py-5 bg-white d-flex justify-content-center align-items-center col-12">
        <EyesEmoji />
      </section>
      <section class="member-details mt-1 py-4 bg-white flex-fill col-12 d-flex flex-column justify-content-center align-items-center">
        <figure class="d-flex flex-column justify-content-center align-items-center">
          <SelectionIllustration />
          <figcaption>
            <p class="text-muted">Select a member to view the bio data</p>
          </figcaption>
        </figure>
      </section>
    </div>
  );
}

export default NotSelected;
