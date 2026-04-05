"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

function IconCloud({ iconSlugs = [], iconLabels = {}, onIconClick }) {
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    if (iconSlugs.length > 0) {
      fetchSimpleIcons({ slugs: iconSlugs })
        .then((data) => {
          const availableIcons = iconSlugs
            .map((slug) => data.simpleIcons?.[slug])
            .filter(Boolean);
          if (availableIcons.length === 0) {
            console.warn("IconCloud: no icons found for slugs", iconSlugs);
          }
          setIcons(availableIcons);
        })
        .catch((error) => {
          console.error("IconCloud fetchSimpleIcons failed", error);
          setIcons([]);
        });
    } else {
      setIcons([]);
    }
  }, [iconSlugs]);

  const rendered = useMemo(() => {
    if (!icons || icons.length === 0) return null;
    return icons
      .filter(Boolean)
      .map((icon) => {
        const label = iconLabels[icon.slug] || icon.title || icon.slug;
        try {
          return renderSimpleIcon({
            icon,
            size: 42,
            fallbackHex: "#fff",
            minContrastRatio: 1.5,
            aProps: {
              role: "button",
              tabIndex: 0,
              title: label,
              "aria-label": label,
              onClick: (event) => {
                event.preventDefault();
                if (typeof onIconClick === "function") {
                  onIconClick(label);
                }
              },
              onKeyDown: (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  if (typeof onIconClick === "function") {
                    onIconClick(label);
                  }
                }
              },
            },
          });
        } catch (error) {
          console.warn("IconCloud renderSimpleIcon skipped icon", icon?.slug, error);
          return null;
        }
      })
      .filter(Boolean);
  }, [icons, onIconClick]);

  return (
    <Cloud
      options={{
        depth: 1,
        imageScale: 2,
        wheelZoom: false,
        reverse: true,
        clickToFront: false,
        freezeActive: true,
        freezeDecel: true,
        activeCursor: "pointer",
        tooltip: "native",
        maxSpeed: 0.035,
        minSpeed: 0.01
      }}
      containerProps={{
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }}
    >
      {rendered}
    </Cloud>
  );
}

export default memo(IconCloud);
