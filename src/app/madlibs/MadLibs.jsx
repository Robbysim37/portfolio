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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModal } from "../providers/ModalProvider";
// ⬇️ Update this path to your file location
import WaveText from "@/components/WaveText";

/* =====================================================
   Mad Libs Drag & Drop (uses ModalProvider)
   - Real-card drag (no ghost), portaled to <body>
   - Centered on cursor pre-start, onDragStart, and each onDrag
   - No springs; instant snap on drop; click chip to remove
   - Category matching, replace on occupied
   - Palette: shadcn Accordion + Tabs
   - Soft hover shadow on Card (overrides global glow)
   - Modal content: shows WaveText ONLY for games-2
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
      { id: "identity-1", title: "A Programmer", text: "The reason you’re even here—and one of my favorite pastimes that I’m trying to turn into my career. I’ve been developing since 2022. I started with a programming bootcamp and have been learning and building projects ever since. I’ve done some internship work, but I’m really looking for my start as a junior developer.", image: null, category: "Identity" },
      { id: "identity-2", title: "An Eagle Scout", text: "I’ll be honest—I almost forgot to include this, since I haven’t been involved with the Boy Scouts of America recently. But I’d like to think that this is still a title with some weight to it. It’s something I had to earn through time, effort, and service to my community.", image: null, category: "Identity" },
      { id: "identity-3", title: "A Thespian", text: "Before I graduated high school, I would have told you my dream job was to be an actor. Over time, I drifted away from that idea and began to pursue careers closer to my love for science and logic. But I still like to imagine there’s a universe where I play a supervillain—mostly because of the goatee.", image: null, category: "Identity" },
    ],
    Hobbies: [
      { id: "hobbies-1", title: "My Cats", text: "Rock & Roll—not just a music genre or the Japanese names for Mega Man (Rockman) and his sister Roll—they’re also my cats! Truly the best cats on the planet, even if I sometimes come home to chewed-up cords. It’s worth it to watch Roll stare at me with her big ol’ bug eyes.", image: null, category: "Hobbies" },
      { id: "hobbies-2", title: "My Family", text: "Some people have a family tree; I have a family orchard. My great-grandmother had ten children on my dad’s side, and my mom’s side has a yearly reunion. I’m pretty lucky to have a crew of people to love and rely on, and I never run out of fun stories to tell about them!", image: null, category: "Hobbies" },
      { id: "hobbies-3", title: "Music", text: "Unfortunately, the only keyboard I play makes code, not music. But one day, I’d love to pick up the piano—I’ve got quite a few songs I want to be able to bust out at parties. Without music, I don’t know how I’d sit down and code, take long road trips, or truly relax. My favorite way to start the day is with bacon, eggs, and Frank Sinatra.", image: null, category: "Hobbies" },
      { id: "hobbies-4", title: "Games", text: "Later in this minigame, there’ll be more details—but I love systems, strategy, competition, bragging rights, and learning from failure. All of that is wrapped neatly in what we know as games. I always play my hardest out of respect for my opponents—but I also make sure to have fun. Because without the fun, there’s not much point.", image: null, category: "Hobbies" },
    ],
    JobExperience: [
      { id: "job-1", title: "A Salesperson", text: "From sales to software! I started my professional journey at GameStop and more recently sold cell phones with T-Mobile. All of this helped me stay financially stable while I work toward a software career—but I always look for lessons I can carry with me wherever I go.", image: null, category: "JobExperience" },
      { id: "job-2", title: "Data Entry", text: "My data entry job wasn’t technically a programming role, but I made sure to treat it like one! I turned a task that took my coworkers 3–4 hours into something I could complete in 30 minutes—thanks to Microsoft Excel and VBA. That job taught me how to write code that made my work as easy as 1, 2, 3!", image: null, category: "JobExperience" },
      { id: "job-3", title: "A Software Developer", text: "While I haven’t been salaried for my skills yet, I’ve done project work for a company called Alcove Ridge. There, I learned a lot about the Next.js workflow and routing. I went from handling simple CSS styling to wiring up forms for user data. Many of my professional references come from that experience.", image: null, category: "JobExperience" },
      { id: "job-4", title: "Logistics", text: "It’s been a while since I worked in a warehouse, but yes—I can drive a forklift! How will that help me program for you? It won’t. But I do know the pain points within logistics, and I definitely have opinions on what could be improved.", image: null, category: "JobExperience" },
    ],
    Movies: [
      { id: "movie-1", title: "The Truman Show", text: "And in case I don’t see ya—good morning, good afternoon, and goodnight! This movie stands alone as my favorite of all time. Every time I watch it, I notice something new I missed before. The level of detail and the subtle Easter eggs make it truly shine—it’s both in-your-face and quietly profound.", image: null, category: "Movies" },
      { id: "movie-2", title: "Monty Python and the Holy Grail", text: "It’s just a flesh wound! British comedy may not be for everyone, but it’s absolutely for me. It’s hard to choose between this and Life of Brian, but I have to give it to Holy Grail—if only for the acting of ‘Sir Not-Appearing-in-this-Film.’", image: null, category: "Movies" },
      { id: "movie-3", title: "Curse of the Were-Rabbit", text: "No quotes here—that’s somewhere else on the website! Really, any film involving Wallace and his expressive dog Gromit is a favorite of mine. Not only was it a staple of my childhood, but it still holds up today as a work of passion, substance, and raw talent.", image: null, category: "Movies" },
      { id: "movie-4", title: "Rounders", text: "If you can’t spot the sucker in your first half hour at the table, then you ARE the sucker. A solid movie that really understands poker. I’m no Mike McDermott, but I’m definitely a fan of the game!", image: null, category: "Movies" },
    ],
    Games: [
      { id: "games-1", title: "Video Games", text: "I’ve spent a lot of time around video games since childhood. Some of my best memories are on the Super Nintendo or Nintendo 64, playing with friends and family. I don’t play many shooters, but if there’s a puzzle to solve or an adventure to experience, there’s a good chance I’ve played it.", image: null, category: "Games" },
      {
        id: "games-2",
        title: "Classics",
        text: "I love the old school. There’s something magical about how the limits of early technology forced developers to innovate in music, design, art, and gameplay. I’m a firm believer that limitations shape real art—and the early days of gaming were truly the golden years.",
        image: null,
        category: "Games",
        // 👇 Only this tile gets WaveText in the modal:
        waveText: "E E E C E G lowG",
      },
      { id: "games-3", title: "Board Games", text: "I’m a fan of all sorts of board games, and I make a habit of getting together with family often to play. I’m always down for simple games like Monopoly or Sorry, as well as deeper ones like Diplomacy or The Campaign for North Africa.", image: null, category: "Games" },
      { id: "games-4", title: "Card Games", text: "Rounders is one of my favorite movies, so you can guess I like poker. As a Midwesterner, I’m also legally obligated to enjoy Euchre. Of course, I love trading card games like Magic: The Gathering and Hearthstone. But not Yu-Gi-Oh! Never Yu-Gi-Oh…", image: null, category: "Games" },
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

  // soft hover override (replaces global glow from Card)
  const SOFT_HOVER = "hover:shadow-[0_8px_24px_-12px_rgb(0_0_0_/_0.25)] hover:scale-[1.005] transition-shadow duration-200";

  const cardInner = (
    <Card
      ref={ref}
      data-tile-id={tile.id}
      className={[
        "relative select-none",
        "px-3 py-2 text-sm rounded-md border border-border bg-card hover:bg-accent/10",
        isDragging ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing",
        SOFT_HOVER,
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
            <AccordionTrigger className="px-4 [&>svg]:hidden" style={{ height: peekHeight }}>
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
  const { openModal,closeModal } = useModal();

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

    // assign immediately (replace if occupied), then snap instantly
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

    // 🔔 Open modal via provider (full-screen centering handled by provider styles)
    openModal(
      <Card className="w-full max-w-2xl">
        <CardHeader className="pb-2">
          <CardTitle>{tile.title}</CardTitle>
          {/* Only games-2 renders WaveText */}
          {"waveText" in tile && tile.waveText ? (
            <div className="mt-2">
              <WaveText
                text={tile.waveText}
                delay={0.12}
                duration={1.2}
                className="text-primary font-semibold"
                letterClassName="tracking-wide"
              />
            </div>
          ) : null}
        </CardHeader>
        <CardContent className="text-sm text-foreground/80">
          {tile.image ? (
            <div className="mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full rounded-lg border border-border"
              />
            </div>
          ) : null}
          <p>{tile.text}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={closeModal}>Close</Button>
        </CardFooter>
      </Card>
    );

    endDrag(true);
  };

  // click-to-remove
  const clearZone = (zoneId) => {
    setAssignments((prev) => ({ ...prev, [zoneId]: null }));
  };

  return (
    <div className="relative mt-32">
      {/* Paragraph with inline zones */}
      <h2 className="w-full text-center">The Robert Lewis Mad Libs!</h2> 
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
    </div>
  );
}
