"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useDragControls } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

/* =====================================================
   Mad Libs Drag & Drop (soft hover variant)
   - Actual card drags (no ghost). Portaled to <body>.
   - Center under cursor pre-start, onDragStart, and each onDrag.
   - No springs; instant snap on drop.
   - Click chip in zone to remove.
   - Category match, replace-on-occupied.
   - Zones: muted bg only. Palette: shadcn Accordion + Tabs.
   - Soft hover shadow overrides global glow on Card for this component.
   ===================================================== */

const PARAGRAPH = `Hi there! My name is Robert Lewis. I'm a {{Identity}} who loves {{Hobbies}}. I'm a bit of a workaholic, as software development has taken up much of my free time. I have experience as {{JobExperience}} and always put in maximum effort to succeed in any position I'm in. When I'm not working, I enjoy watching movies—one of my favorites being {{Movies}}. When I have extra time on my hands, I like to play {{Games}}; something about learning a system and using it efficiently to "win" is very satisfying. At the end of the day, I'm a hardworking man who’s eager to start his career as a developer, and there’s no substitute for that. I hope you'll consider me for your next open position.`;

const CONFIG = {
  tabs: [
    { id: "Identity", label: "Identity" },
    { id: "Hobbies", label: "Hobbies" },
    { id: "JobExperience", label: "Job Experience" },
    { id: "Movies", label: "Movies" },
    { id: "Games", label: "Games" },
  ],
  tiles: {
    Identity: [
      { id: "identity-1", title: "A Programmer", text: "A Programmer", image: null, category: "Identity" },
      { id: "identity-2", title: "An Eagle Scout", text: "An Eagle Scout", image: null, category: "Identity" },
      { id: "identity-3", title: "A Thespian", text: "A Thespian", image: null, category: "Identity" },
    ],
    Hobbies: [
      { id: "hobbies-1", title: "My cats", text: "My cats", image: null, category: "Hobbies" },
      { id: "hobbies-2", title: "My Family", text: "My Family", image: null, category: "Hobbies" },
      { id: "hobbies-3", title: "Music", text: "Music", image: null, category: "Hobbies" },
      { id: "hobbies-4", title: "Games", text: "Games", image: null, category: "Hobbies" },
    ],
    JobExperience: [
      { id: "job-1", title: "A Salesperson", text: "A Salesperson", image: null, category: "JobExperience" },
      { id: "job-2", title: "Data Entry", text: "Data Entry", image: null, category: "JobExperience" },
      { id: "job-3", title: "A Software Developer", text: "A Software Developer", image: null, category: "JobExperience" },
      { id: "job-4", title: "Logistics", text: "Logistics", image: null, category: "JobExperience" },
    ],
    Movies: [
      { id: "movie-1", title: "The Truman Show", text: "The Truman Show", image: null, category: "Movies" },
      { id: "movie-2", title: "Monty Python and the Holy Grail", text: "Monty Python and the Holy Grail", image: null, category: "Movies" },
      { id: "movie-3", title: "Now You See Me", text: "Now You See Me", image: null, category: "Movies" },
      { id: "movie-4", title: "Rounders", text: "Rounders", image: null, category: "Movies" },
    ],
    Games: [
      { id: "games-1", title: "Video Games", text: "Video Games", image: null, category: "Games" },
      { id: "games-2", title: "Classics", text: "Classics", image: null, category: "Games" },
      { id: "games-3", title: "Board Games", text: "Board Games", image: null, category: "Games" },
      { id: "games-4", title: "Card Games", text: "Card Games", image: null, category: "Games" },
    ],
  },
};

// ---------- helpers ----------
function parseParagraph(str) {
  const regex = /\{\{(.*?)\}\}/g;
  const parts = [];
  let lastIndex = 0;
  let m;
  let zoneCounter = {};
  while ((m = regex.exec(str)) !== null) {
    const [full, category] = m;
    if (m.index > lastIndex) parts.push({ type: "text", value: str.slice(lastIndex, m.index) });
    const cat = category.trim();
    zoneCounter[cat] = (zoneCounter[cat] || 0) + 1;
    const zoneId = `${cat}#${zoneCounter[cat] - 1}`;
    parts.push({ type: "zone", category: cat, zoneId });
    lastIndex = m.index + full.length;
  }
  if (lastIndex < str.length) parts.push({ type: "text", value: str.slice(lastIndex) });
  return parts;
}

function clientXY(e) {
  const p = e?.nativeEvent ?? e;
  if (p?.clientX != null) return { x: p.clientX, y: p.clientY };
  const t = p?.touches?.[0] ?? p?.changedTouches?.[0];
  if (t) return { x: t.clientX, y: t.clientY };
  return { x: 0, y: 0 };
}

// ---------- zones ----------
function Zone({ zoneId, category, assignedTile, onClearZone, setZoneRef }) {
  const ref = useRef(null);
  useEffect(() => {
    setZoneRef(zoneId, ref);
    return () => setZoneRef(zoneId, null);
  }, [zoneId, setZoneRef]);
  const filled = !!assignedTile;
  return (
    <span
      ref={ref}
      data-zone-id={zoneId}
      data-category={category}
      className={[
        "inline-flex align-baseline items-center gap-1",
        "rounded-md px-2 py-[2px]",
        filled ? "bg-transparent" : "bg-muted/60 text-muted-foreground",
      ].join(" ")}
      style={{ minHeight: "1.9em" }}
    >
      {filled ? (
        <Chip tile={assignedTile} onClick={() => onClearZone(zoneId)} />
      ) : (
        <span className="opacity-70">{category}</span>
      )}
    </span>
  );
}

function Chip({ tile, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center align-baseline rounded-md bg-accent/20 text-foreground border border-border px-2 py-[2px] select-none cursor-pointer hover:bg-accent/30 transition"
      aria-label={`Remove ${tile.title}`}
    >
      {tile.title}
    </button>
  );
}

// ---------- palette card (actual draggable) ----------
function TileCard({ tile, hidden, onPointerDown, isDragging, dragX, dragY, dragControls, onDragEnd }) {
  const ref = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      sizeRef.current = { width: r.width, height: r.height };
    }
  }, [isDragging]);

  if (hidden && !isDragging) return null;

  // 👇 Soft hover override (replaces global glow from Card)
  const SOFT_HOVER = "hover:shadow-[0_8px_24px_-12px_rgb(0_0_0_/_0.25)] hover:scale-[1.005] transition-shadow duration-200";

  const cardInner = (
    <Card
      ref={ref}
      data-tile-id={tile.id}
      className={[
        "relative select-none",
        "px-3 py-2 text-sm rounded-md border border-border bg-card hover:bg-accent/10",
        isDragging ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing",
        SOFT_HOVER, // <-- override
      ].join(" ")}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onPointerDown(e);
      }}
    >
      {tile.title}
    </Card>
  );

  if (isDragging) {
    const DragFrame = (
      <motion.div
        className="fixed left-0 top-0 z-40 pointer-events-auto"
        style={{ x: dragX, y: dragY, touchAction: "none" }}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.15}
        onDragStart={(e) => {
          const { x: px, y: py } = clientXY(e);
          const w = sizeRef.current.width || 0;
          const h = sizeRef.current.height || 0;
          dragX.set(Math.round(px - w / 2));
          dragY.set(Math.round(py - h / 2));
        }}
        onDrag={(e) => {
          const { x: px, y: py } = clientXY(e);
          const w = sizeRef.current.width || 0;
          const h = sizeRef.current.height || 0;
          dragX.set(Math.round(px - w / 2));
          dragY.set(Math.round(py - h / 2));
        }}
        onDragEnd={onDragEnd}
        initial={false}
      >
        {cardInner}
      </motion.div>
    );

    return (
      <>
        {/* placeholder to hold grid space */}
        <div style={{ width: sizeRef.current.width, height: sizeRef.current.height }} />
        {createPortal(DragFrame, document.body)}
      </>
    );
  }

  return cardInner;
}

// ---------- bottom palette ----------
function PaletteAccordion({
  tabs,
  tilesByTab,
  assignments,
  onTilePointerDown,
  draggingTileId,
  dragX,
  dragY,
  dragControls,
  onDragEnd,
  peekHeight = 44,
}) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  return (
    <div className="fixed inset-x-0 bottom-0 z-30">
      <div className="flex items-center justify-center border-t border-border bg-muted/60 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
        <Accordion type="single" collapsible value={open ? "palette" : undefined} onValueChange={(v) => setOpen(!!v)}>
          <AccordionItem value="palette" className="border-none">
            <AccordionTrigger className="px-4" style={{ height: peekHeight }}>
              <div className="mx-auto h-1.5 w-10 rounded-full bg-border" />
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="mx-auto max-w-5xl">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full overflow-x-auto justify-start">
                    {tabs.map((t) => (
                      <TabsTrigger key={t.id} value={t.id} className="whitespace-nowrap">
                        {t.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabs.map((t) => (
                    <TabsContent key={t.id} value={t.id} className="mt-3">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[35vh] overflow-y-auto pr-1">
                        {tilesByTab[t.id]?.map((tile) => {
                          const isPlaced = Object.values(assignments).includes(tile.id);
                          const isDraggingThis = draggingTileId === tile.id;
                          return (
                            <TileCard
                              key={tile.id}
                              tile={tile}
                              hidden={isPlaced}
                              isDragging={isDraggingThis}
                              dragX={dragX}
                              dragY={dragY}
                              dragControls={dragControls}
                              onDragEnd={onDragEnd}
                              onPointerDown={(e) => onTilePointerDown(e, tile, { source: "palette", tabId: t.id })}
                            />
                          );
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default function MadLibsComposer() {
  const segments = useMemo(() => parseParagraph(PARAGRAPH), []);
  const tilesById = useMemo(() => {
    const map = {};
    for (const cat of Object.keys(CONFIG.tiles)) for (const t of CONFIG.tiles[cat]) map[t.id] = t;
    return map;
  }, []);

  // zoneId -> tileId | null
  const initialAssignments = useMemo(() => {
    const a = {};
    for (const seg of segments) if (seg.type === "zone") a[seg.zoneId] = null;
    return a;
  }, [segments]);
  const [assignments, setAssignments] = useState(initialAssignments);

  // zone refs
  const zoneRefs = useRef({});
  const setZoneRef = (zoneId, refObj) => {
    if (!refObj) delete zoneRefs.current[zoneId];
    else zoneRefs.current[zoneId] = refObj;
  };

  // framer drag state
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const dragControls = useDragControls();
  const [dragState, setDragState] = useState({
    active: false,
    tileId: null,
    source: null,
    sourceZoneId: null,
    homeRect: null,
  });

  // modal
  const [modalTileId, setModalTileId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // start drag (pre-center to prevent top-left snap)
  const beginDrag = (e, tile, { source, zoneId }) => {
    e.preventDefault();
    e.stopPropagation();

    let homeRect = null;
    const el = e.currentTarget;
    if (el && el.getBoundingClientRect) {
      homeRect = el.getBoundingClientRect();
    }

    if (source === "zone") {
      setAssignments((prev) => ({ ...prev, [zoneId]: null }));
    }

    setDragState({ active: true, tileId: tile.id, source, sourceZoneId: zoneId ?? null, homeRect });

    const { x: px0, y: py0 } = clientXY(e);
    const w0 = homeRect?.width ?? 0;
    const h0 = homeRect?.height ?? 0;
    dragX.set(Math.round(px0 - w0 / 2));
    dragY.set(Math.round(py0 - h0 / 2));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        try { dragControls.start(e); } catch {}
      });
    });
  };

  const measureDraggedCard = () => {
    if (!dragState.tileId) return null;
    const el = document.querySelector('[data-tile-id="' + dragState.tileId + '"]');
    return el?.getBoundingClientRect() ?? dragState.homeRect ?? null;
  };

  const setToRectCenter = (rect) => {
    const cardRect = measureDraggedCard();
    if (!cardRect) return;
    const x = Math.round(rect.left + (rect.width - cardRect.width) / 2);
    const y = Math.round(rect.top + (rect.height - cardRect.height) / 2);
    dragX.set(x);
    dragY.set(y);
  };

  const endDrag = (keepPosition = false) => {
    setDragState({ active: false, tileId: null, source: null, sourceZoneId: null, homeRect: null });
    if (!keepPosition) {
      dragX.set(0);
      dragY.set(0);
    }
  };

  // drop detection (client coords)
  const handleDragEnd = async (e) => {
    const tileId = dragState.tileId;
    if (!tileId) return endDrag();

    const tile = tilesById[tileId];
    const { x: px, y: py } = clientXY(e);

    // find matching-category zone under pointer
    const entries = Object.entries(zoneRefs.current);
    let hit = null;
    for (const [zoneId, refObj] of entries) {
      const el = refObj?.current;
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const contains = px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
      const seg = segments.find((s) => s.type === "zone" && s.zoneId === zoneId);
      const ok = seg?.category === tile.category;
      if (contains && ok) { hit = { zoneId, rect: r }; break; }
    }

    if (!hit) {
      if (dragState.homeRect) setToRectCenter(dragState.homeRect);
      return endDrag();
    }

    // assign immediately, then snap instantly
    setAssignments((prev) => {
      const next = { ...prev };
      for (const z in next) if (next[z] === tileId) next[z] = null;
      next[hit.zoneId] = tileId;
      return next;
    });

    setToRectCenter(hit.rect);
    await new Promise((res) => requestAnimationFrame(res));
    const zone2 = zoneRefs.current[hit.zoneId]?.current?.getBoundingClientRect();
    if (zone2) setToRectCenter(zone2);

    setModalTileId(tileId);
    setModalOpen(true);
    endDrag(true);
  };

  // click-to-remove
  const clearZone = (zoneId) => {
    setAssignments((prev) => ({ ...prev, [zoneId]: null }));
  };

  return (
    <div className="relative mt-32">
    <h2 className="w-full text-center">The Robert Lewis Mad Libs!</h2>
      {/* Paragraph with inline zones */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="leading-relaxed">
          {segments.map((seg, i) => {
            if (seg.type === "text") return <React.Fragment key={i}>{seg.value}</React.Fragment>;
            const assignedTileId = assignments[seg.zoneId];
            const assignedTile = assignedTileId ? tilesById[assignedTileId] : null;
            return (
              <Zone
                key={seg.zoneId}
                zoneId={seg.zoneId}
                category={seg.category}
                assignedTile={assignedTile}
                onClearZone={clearZone}
                setZoneRef={setZoneRef}
              />
            );
          })}
        </p>
      </div>

      {/* Bottom palette */}
      <PaletteAccordion
        tabs={CONFIG.tabs}
        tilesByTab={CONFIG.tiles}
        assignments={assignments}
        draggingTileId={dragState.tileId}
        dragX={dragX}
        dragY={dragY}
        dragControls={dragControls}
        onDragEnd={handleDragEnd}
        onTilePointerDown={(e, tile) => beginDrag(e, tile, { source: "palette" })}
      />

      {/* Modal after snap */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{modalTileId ? tilesById[modalTileId]?.title : ""}</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-foreground/80">
            {modalTileId ? tilesById[modalTileId]?.text : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
