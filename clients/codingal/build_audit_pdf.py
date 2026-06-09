#!/usr/bin/env python3
"""Build a branded UX audit PDF for codingal.com from the audit content."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    FrameBreak, NextPageTemplate, KeepTogether, Flowable,
)
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet

# ---- Brand palette ----
CORAL = colors.HexColor("#F9543B")
CORAL_DK = colors.HexColor("#E23E27")
CORAL_SOFT = colors.HexColor("#FDE7E0")
INK = colors.HexColor("#2A211B")
INK_SOFT = colors.HexColor("#6B6259")
CREAM = colors.HexColor("#FBF6EE")
CREAM_DEEP = colors.HexColor("#F5ECDD")
LINE = colors.HexColor("#E0D6C6")
GRASS = colors.HexColor("#2FB573")
SKY = colors.HexColor("#3E78F0")
SUN = colors.HexColor("#E0A21B")
AMBER = colors.HexColor("#D98A14")
GREY = colors.HexColor("#8A8077")

SEV_COLOR = {"High": CORAL_DK, "Medium": AMBER, "Low/Medium": GREY, "High (UI)": CORAL_DK}

OUT = "/Users/vysakhtk/Downloads/Ghostbuild-main/clients/codingal/Codingal-UX-Audit.pdf"
PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

styles = getSampleStyleSheet()

def S(name, **kw):
    base = kw.pop("parent", styles["Normal"])
    return ParagraphStyle(name, parent=base, **kw)

body = S("body", fontName="Helvetica", fontSize=10, leading=15, textColor=INK, spaceAfter=6)
small = S("small", fontName="Helvetica", fontSize=8.5, leading=12, textColor=INK_SOFT)
h1 = S("h1", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=INK, spaceBefore=10, spaceAfter=8)
h2 = S("h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16, textColor=CORAL_DK, spaceBefore=14, spaceAfter=5)
finding_title = S("ft", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=INK)
lbl = S("lbl", fontName="Helvetica-Bold", fontSize=8, leading=11, textColor=INK_SOFT)
kicker = S("kicker", fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=CORAL, spaceAfter=2)
white_small = S("ws", fontName="Helvetica", fontSize=9, leading=13, textColor=colors.white)

# ---- Cover band flowable ----
class Band(Flowable):
    def __init__(self, w, h, color):
        super().__init__(); self.w=w; self.h=h; self.color=color
    def wrap(self, *a): return (self.w, self.h)
    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 0, self.w, self.h, 8, fill=1, stroke=0)

def hr(color=LINE, thickness=0.8, space=6):
    t = Table([[""]], colWidths=[PAGE_W - 2*MARGIN], rowHeights=[thickness])
    t.setStyle(TableStyle([("LINEBELOW",(0,0),(-1,-1),thickness,color)]))
    return [Spacer(1, space), t, Spacer(1, space)]

def sev_chip(sev):
    c = SEV_COLOR.get(sev, GREY)
    p = Paragraph(f'<b>{sev.replace(" (UI)","")}</b>', S("sev", fontName="Helvetica-Bold", fontSize=8, textColor=colors.white, alignment=TA_CENTER))
    t = Table([[p]], colWidths=[24*mm], rowHeights=[7.5*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),c),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("ALIGN",(0,0),(-1,-1),"CENTER"),
        ("ROUNDEDCORNERS",[4,4,4,4]),
    ]))
    return t

def finding(fid, title, sev, problem, rec):
    head = Table(
        [[Paragraph(f"{fid} &nbsp; {title}", finding_title), sev_chip(sev)]],
        colWidths=[(PAGE_W-2*MARGIN)-26*mm, 26*mm],
    )
    head.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0)]))
    parts = [head, Spacer(1,3),
             Paragraph(f'<b>Problem.</b> {problem}', body),
             Paragraph(f'<b>Fix.</b> {rec}', body)]
    return KeepTogether(parts + [Spacer(1,4)])

story = []

# ===== COVER =====
story.append(Spacer(1, 16*mm))
band = Band(PAGE_W-2*MARGIN, 58*mm, CORAL)
# overlay text on band using a table trick
cover_tbl = Table([[ "" ]], colWidths=[PAGE_W-2*MARGIN], rowHeights=[58*mm])
cover_tbl.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,-1),CORAL),
    ("ROUNDEDCORNERS",[10,10,10,10]),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
    ("LEFTPADDING",(0,0),(-1,-1),16*mm),
    ("TOPPADDING",(0,0),(-1,-1),0),
]))
cover_inner = [
    Paragraph("HOMEPAGE EXPERIENCE REVIEW", S("ck", fontName="Helvetica-Bold", fontSize=10, textColor=colors.white, spaceAfter=4)),
    Paragraph("UX &amp; UI Audit", S("ct", fontName="Helvetica-Bold", fontSize=30, leading=34, textColor=colors.white, spaceAfter=4)),
    Paragraph("codingal.com", S("cs", fontName="Helvetica", fontSize=15, textColor=colors.white)),
]
ci = Table([[c] for c in cover_inner], colWidths=[PAGE_W-2*MARGIN-32*mm])
ci.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),CORAL),("LEFTPADDING",(0,0),(-1,-1),16*mm),("TOPPADDING",(0,0),(-1,-1),2),("BOTTOMPADDING",(0,0),(-1,-1),2),("ROUNDEDCORNERS",[10,10,10,10])]))
story.append(ci)
story.append(Spacer(1, 10*mm))
meta_rows = [
    ["Subject", "Live homepage (desktop + mobile web)"],
    ["Audit type", "UX + UI + conversion review"],
    ["Date", "2 June 2026"],
    ["Prepared by", "Oli & Hue — GhostBuild"],
    ["Overall score", "5.0 / 10  (credible brand, under-converting homepage)"],
]
mt = Table([[Paragraph(k, lbl), Paragraph(v, body)] for k,v in meta_rows], colWidths=[34*mm, PAGE_W-2*MARGIN-34*mm])
mt.setStyle(TableStyle([
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
    ("LINEBELOW",(0,0),(-1,-2),0.5,LINE),
    ("LEFTPADDING",(0,0),(-1,-1),0),
]))
story.append(mt)
story.append(Spacer(1, 8*mm))

# ===== EXECUTIVE SUMMARY =====
story.append(Paragraph("Executive summary", h2))
story.append(Paragraph(
    "Codingal has earned trust most edtech brands would envy: a million students, 135 countries, a 4.6/5 parent rating, "
    "and backing from Y Combinator, Google and Amazon. The homepage leans on all of it, hard. That is the problem.", body))
story.append(Paragraph(
    "The page sells credibility before it explains the product. A parent lands, meets ratings, logos and statistics, and "
    "scrolls a long way before understanding what a class is, what their child will build, or what it costs. The result is a "
    "visitor who trusts Codingal but cannot picture the experience or the price, and so does not book.", body))
story.append(Paragraph(
    "The fix is not more proof. It is to lead with clarity, then back it with proof: show what the child builds and how learning "
    "progresses first, then let the substantial trust stack close the deal. Two structural gaps make this worse than ordering "
    "alone: pricing is entirely gated, and there is no preview of what a live class looks like. Both are decisive for a parent "
    "spending money on a child.", body))

# ===== SCORING =====
story.append(Paragraph("Scoring", h2))
score_data = [
    ["Dimension", "Score", "Note"],
    ["First-impression clarity (hero)", "6 / 10", "Strong brand, but the headline is a slogan, not an outcome"],
    ["Product understanding", "4 / 10", "What a class is, what's built, how it progresses is unclear"],
    ["Course discovery", "5 / 10", "Cards show grade + duration only; no level, age or outcome"],
    ["Trust & social proof", "8 / 10", "Abundant, but fragmented and uncontextualised"],
    ["Pricing transparency", "2 / 10", "Fully gated behind signup"],
    ["CTA clarity", "5 / 10", "Strong primary, but inconsistent labels across the page"],
    ["Information hierarchy", "4 / 10", "Proof front-loaded; product buried"],
    ["Copy quality", "6 / 10", "Competent but generic in places"],
    ["Overall", "5.0 / 10", "Credible brand, under-converting homepage"],
]
rows = []
for r in score_data:
    rows.append([Paragraph(r[0], body if r[0] not in ("Dimension","Overall") else S("b2",fontName="Helvetica-Bold",fontSize=10,textColor=INK)),
                 Paragraph(r[1], S("sc",fontName="Helvetica-Bold",fontSize=10,textColor=CORAL_DK if r[0]!="Dimension" else INK, alignment=TA_CENTER)),
                 Paragraph(r[2], small if r[0]!="Dimension" else S("b3",fontName="Helvetica-Bold",fontSize=10,textColor=INK))])
st = Table(rows, colWidths=[55*mm, 22*mm, PAGE_W-2*MARGIN-77*mm])
st.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),CREAM_DEEP),
    ("BACKGROUND",(0,-1),(-1,-1),CORAL_SOFT),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
    ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
    ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),
    ("LINEBELOW",(0,0),(-1,-1),0.5,LINE),
    ("BOX",(0,0),(-1,-1),0.8,LINE),
]))
story.append(st)

# ===== UX FINDINGS =====
story.append(Paragraph("UX findings", h2))
story.append(Paragraph('Severity: <b>High</b> = directly costs bookings &nbsp;&middot;&nbsp; <b>Medium</b> = adds friction &nbsp;&middot;&nbsp; <b>Low</b> = polish.', small))
story.append(Spacer(1,4))

ux = [
 ("UX-1","Proof comes before product understanding","High",
  "The page front-loads ratings, statistics and media logos before answering what this is, what the child will do, and how it works. A parent can finish the first scrolls trusting Codingal yet unable to describe the actual experience.",
  "Lead with the product. Order: Hero → How It Works → Courses → Student Projects → Teachers → Full Trust → Pricing → Final CTA. Keep only a thin credibility strip (one rating line + three logos) high on the page."),
 ("UX-2","No preview of what a class actually is","High",
  "Codingal sells live 1-on-1 instruction to children aged 5 to 17. The single biggest unanswered question for a parent is what happens in the room, and the homepage never shows it: no class screenshot, no clip, no sample of the teacher-student interaction.",
  "Add a “What a class looks like” section: one real class screenshot or a 20 to 30 second clip, plus a one-line description of the session flow."),
 ("UX-3","Pricing is fully gated","High",
  "There is no price anywhere on the public site; it surfaces only after registration. For a considered, recurring purchase aimed at cautious parents, hiding price is a larger blocker than any layout issue. It forces a signup commitment before the buyer has the fact they most want.",
  "Put a pricing anchor on the page. Even a directional “plans from $X, free trial first, full refund if it's not a fit” removes the biggest source of hesitation. Transparency beats a gate."),
 ("UX-4","Course discovery is thin","High",
  "Course cards display grade range, title and duration only. They omit skill level, recommended age, and the outcome, so a parent cannot self-select confidently.",
  "Add a level badge (Beginner / Intermediate / Advanced), an age tag, and a one-line outcome to each card. Offer a “not sure? match my child” path into the free trial."),
 ("UX-5","Parent objections are never addressed","High",
  "The real reasons a parent hesitates are specific and emotional: screen time, “is 5 too young,” “what if my child loses interest,” “can I get my money back.” The site has a generic FAQ that does not confront these.",
  "Rebuild the FAQ around the actual blockers: screen-time framing, age suitability, what happens if the child disengages, exact refund mechanics, device requirements, and why guided 1-on-1 beats free tutorials."),
 ("UX-6","Statistics lack context","Medium",
  "“4.6/5,” “1,000,000+ students,” “Top 1% instructors” are impressive but unsupported, which makes them read as marketing rather than evidence.",
  "Attach the source to every number: “4.6/5 from 20,000+ parent reviews,” “hired from the top 1% of 50,000+ applicants.” Context turns a claim into proof."),
 ("UX-7","Inconsistent CTA strategy","Medium",
  "The live page mixes “Try a free lesson,” “Sign Up,” “Join class,” and “Try free.” Multiple labels for one action add micro-friction and dilute the primary path.",
  "One primary CTA everywhere (“Book a free trial class”), one secondary (“See the courses”). No third variant."),
 ("UX-8","Dual audience is unmanaged","Medium",
  "The parent pays; the child uses. These are two people with different triggers, and the page speaks to one at a time without a strategy. The hero is parent-facing; the course art is kid-facing; nothing ties them together.",
  "Make the split intentional. Parent-facing copy carries the headline, trust, pricing and outcomes. Kid-facing energy lives in the course cards and project showcase. Let the parent see their child wanting it."),
 ("UX-9","“How It Works” reads as passive","Low/Medium",
  "Three disconnected cards describe the process without a sense of progression.",
  "Connect the three steps visually with a numbered timeline and connectors."),
]
for f in ux:
    story.append(finding(*f))

# ===== UI FINDINGS =====
story.append(Paragraph("UI findings", h2))
ui = [
 ("UI-1","Layout monotony","Medium",
  "Most sections repeat heading → paragraph → white card, producing scroll fatigue on an already long page.",
  "Vary the rhythm: split image/text sections, an image-led project showcase, a timeline, a full-width trust band."),
 ("UI-2","Limited visual proof of student work","High (UI)",
  "Very little on the page shows what students actually create. For an outcomes-driven purchase this is the most persuasive visual asset and it is underused.",
  "Add a prominent “Projects students build” showcase (games, apps, websites, AI projects), ideally clickable, with the child's grade shown."),
 ("UI-3","Logo / media row is crowded","Medium",
  "Press and partner logos appear cramped and unsized, weakening rather than reinforcing authority.",
  "Standardise logo height, increase spacing, and group “Backed by” separately from “As seen in.”"),
 ("UI-4","Weak typographic hierarchy","Medium",
  "Similar type scale and card styling across sections means important content competes with secondary content for attention.",
  "Widen the type scale between section headers, sub-heads and body. Use a clear visual anchor per section."),
]
for f in ui:
    story.append(finding(*f))

# ===== TRUST CONTRADICTION =====
story.append(Paragraph("Resolving the trust-placement question", h2))
story.append(Paragraph(
    "The instinct to move trust later (UX-1) and the instinct to show credibility early can both be right if we separate two "
    "different things. A thin credibility strip (one rating line + three logos) directly under the hero is good and is not what "
    "UX-1 warns against. The heavy trust block (review detail, instructor depth, full press row, contextualised stats) belongs "
    "after the parent understands the product. So: slim strip high, deep trust low.", body))

# ===== RECOMMENDED STRUCTURE =====
story.append(Paragraph("Recommended homepage structure", h2))
structure = [
    "Hero — outcome headline, primary CTA, one trust line",
    "Thin credibility strip — rating + 3 logos",
    "How It Works — three connected steps",
    "Courses — cards with grade, level, age and outcome",
    "What a class looks like — class preview",
    "Student project showcase — real builds, grade-tagged",
    "The teachers — top 1%, CS grads, background-checked",
    "Why parents trust Codingal — full, contextualised trust",
    "Pricing — transparent anchor + free trial + refund",
    "FAQ — real parent objections answered",
    "Final conversion — single CTA",
]
srows = [[Paragraph(f'<b>{i+1}</b>', S("n",fontName="Helvetica-Bold",fontSize=10,textColor=CORAL,alignment=TA_CENTER)),
         Paragraph(s, body)] for i,s in enumerate(structure)]
sct = Table(srows, colWidths=[12*mm, PAGE_W-2*MARGIN-12*mm])
sct.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("TOPPADDING",(0,0),(-1,-1),3),("BOTTOMPADDING",(0,0),(-1,-1),3),("LEFTPADDING",(0,0),(-1,-1),0)]))
story.append(sct)

# ===== PRIORITY MATRIX =====
story.append(Paragraph("Priority matrix", h2))
def prio_box(title, color, items):
    head = Paragraph(title, S("ph",fontName="Helvetica-Bold",fontSize=10.5,textColor=colors.white))
    htbl = Table([[head]], colWidths=[PAGE_W-2*MARGIN])
    htbl.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),color),("LEFTPADDING",(0,0),(-1,-1),8),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
    lst = Paragraph("<br/>".join(f"• {x}" for x in items), S("pl",fontName="Helvetica",fontSize=9.5,leading=15,textColor=INK))
    btbl = Table([[lst]], colWidths=[PAGE_W-2*MARGIN])
    btbl.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),CREAM_DEEP),("LEFTPADDING",(0,0),(-1,-1),10),("RIGHTPADDING",(0,0),(-1,-1),10),("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7)]))
    return KeepTogether([htbl, btbl, Spacer(1,6)])
story.append(prio_box("P1 — Critical (do first)", CORAL_DK, [
    "Reorder: product before heavy proof (UX-1)",
    "Add a “what a class looks like” preview (UX-2)",
    "Put a pricing anchor on the page (UX-3)",
    "Richer course cards: level, age, outcome (UX-4)",
    "Restore + strengthen the project showcase (UI-2)",
    "Standardise CTAs (UX-7)",
]))
story.append(prio_box("P2 — Important", AMBER, [
    "Rebuild FAQ around real parent objections (UX-5)",
    "Contextualise every statistic (UX-6)",
    "Deliberate dual-audience messaging (UX-8)",
    "Resolve trust placement: slim high, deep low",
]))
story.append(prio_box("P3 — Enhancement", GREY, [
    "Connected “How It Works” timeline (UX-9)",
    "Layout variety (UI-1)",
    "Logo row cleanup (UI-3)",
    "Stronger typographic hierarchy (UI-4)",
]))

# ===== Footer note =====
story += hr()
story.append(Paragraph(
    "Prepared by Oli &amp; Hue (GhostBuild). This audit is the basis for the rebuilt Codingal homepage: every P1 finding above is "
    "addressed in the live rebuild.", small))

# ---- Page template w/ header/footer ----
def on_page(canvas, doc):
    canvas.saveState()
    # background
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # footer
    canvas.setFillColor(INK_SOFT)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(MARGIN, 10*mm, "Codingal — UX & UI Audit")
    canvas.drawRightString(PAGE_W-MARGIN, 10*mm, f"Page {doc.page}")
    canvas.setStrokeColor(LINE); canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 13*mm, PAGE_W-MARGIN, 13*mm)
    canvas.restoreState()

frame = Frame(MARGIN, 15*mm, PAGE_W-2*MARGIN, PAGE_H-15*mm-12*mm, id="main")
doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=MARGIN, rightMargin=MARGIN, topMargin=12*mm, bottomMargin=15*mm)
doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=on_page)])
doc.build(story)
print("WROTE", OUT)
