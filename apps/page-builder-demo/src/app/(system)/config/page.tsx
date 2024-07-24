"use client";

import { components } from "@/app/easyblocks/components";
import { easyblocksConfig } from "@/app/easyblocks/easyblocks.config";
import { ExternalData } from "@swell/easyblocks-core";
import { EasyblocksEditor } from "@swell/easyblocks-editor";
import { useState } from "react";
import { mockImageWidget } from "../../easyblocks/externalData/mockMedia/mockImageWidget";
import { MockImagePicker } from "../../easyblocks/externalData/mockMedia/MockImagePicker";
import { mockVideoWidget } from "../../easyblocks/externalData/mockMedia/mockVideoWidget";
import { MockVideoPicker } from "../../easyblocks/externalData/mockMedia/MockVideoPicker";
import { createMyCustomFetch } from "../../easyblocks/myCustomFetch";
import {
  PexelsImagePicker,
  pexelsImageWidget,
} from "../../easyblocks/externalData/pexels/pexelsImageWidget";
import {
  PexelsVideoPicker,
  pexelsVideoWidget,
} from "../../easyblocks/externalData/pexels/pexelsVideoWidget";
import {
  ProductPicker,
  productWidget,
} from "../../easyblocks/externalData/product/productWidget";
import { UrlWidget } from "../../easyblocks/types/UrlWidget";

const myCustomFetch = createMyCustomFetch();

export default function EeasyblocksEditorPage() {
  return JSON.stringify({
    // components,
    easyblocksConfig,
  });
}
