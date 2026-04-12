import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const precedents = [
  {
    citation: "2023 NY App. Div. 2341",
    caseName: "Metroprop LLC v. Whitmore",
    fullJudgment: `In the Supreme Court of the State of New York, Appellate Division, Second Judicial Department.

METROPROP LLC, Respondent,
v.
WHITMORE COMMERCIAL INC., Appellant.

2023 NY App. Div. 2341 (2023)

Argued: March 15, 2023
Decided: May 22, 2023

PRIOR HISTORY: Appeals from a judgment of the Supreme Court, Kings County, entered November 14, 2022.

DISPOSITION: Judgment affirmed with costs.

OPINION BY: Rivera, J.

The instant appeal arises from a commercial lease agreement between Metroprop LLC (landlord) and Whitmore Commercial Inc. (tenant) for premises located at 1425 Industrial Parkway, Brooklyn, New York.

BACKGROUND: On June 1, 2019, the parties executed a ten-year commercial lease requiring monthly rent of $45,000. The premises were to be used for manufacturing and distribution operations.

In September 2021, Hurricane Henri caused significant damage to the roof of the commercial building, resulting in water intrusion and rendering approximately 40% of the leased premises unusable for tenant's operations.

Tenant immediately notified landlord and sought rent abatement. Landlord refused, citing the lease's force majeure clause and asserting that repairs would be completed within 60 days.

Over the following four months, landlord completed temporary repairs but full restoration was not achieved until February 2022. During this period, tenant operated at 60% capacity and attempted to mitigate damages by relocating some operations to a subsidiary facility.

HOLDING: The court held that when premises are rendered substantially unusable by force majeure events, a commercial tenant is entitled to proportional rent abatement.

REASONING: The force majeure clause in the lease specifically enumerated natural disasters but was silent on the consequences of such events. Under New York law, when a premises is rendered substantially unusable for its intended purpose, a tenant may be entitled to rent abatement proportional to the loss of use.

The court found that the 40% reduction in usable space over a four-month period warranted a 40% rent reduction for that period, minus any savings achieved by tenant through the relocated operations.

The court also noted that landlord's failure to maintain business interruption insurance, despite being a common practice recommended in the commercial leasing industry, did not excuse the landlord's obligations under the lease.

ATTORNEY FOR APPELLANT: Steinberg & Associates, LLP
ATTORNEY FOR RESPONDENT: Morgan & Partners, P.C.`,
    factSummary: "Commercial landlord sought rent abatement due to hurricane damage rendering property unusable. Court recognized partial constructive eviction but required tenant to prove premises were substantially unusable.",
    winningArgument: "Court ruled that when premises are rendered substantially unusable by force majeure events, tenant is entitled to proportional rent abatement. Key factor: landlord had insurance but failed to timely repair.",
  },
  {
    citation: "2022 WL 1583471",
    caseName: "Blackwood Industrial v. Cascade Insurance Co.",
    fullJudgment: `UNITED STATES DISTRICT COURT
EASTERN DISTRICT OF WASHINGTON

BLACKWOOD INDUSTRIAL MANUFACTURING, INC., Plaintiff,
v.
CASCADE INSURANCE COMPANY, Defendant.

2022 WL 1583471 (E.D. Wash. 2022)

Filed: May 18, 2022

COMPLAINT for declaratory judgment regarding business interruption coverage.

NATURE OF THE CASE: This case presents questions of first impression regarding the interpretation of pandemic-related exclusions in business income insurance policies following the COVID-19 pandemic.

BACKGROUND: Plaintiff Blackwood Industrial operates a precision manufacturing facility in Spokane, Washington, employing approximately 340 workers. Plaintiff maintained a commercial property insurance policy with defendant Cascade Insurance Company, including business income coverage with limits of $12 million per occurrence and a 12-month restoration period.

On March 16, 2020, Washington State Governor Jay Inslee issued Proclamation 20-25, "Stay Home, Stay Healthy," which required all non-essential businesses to close physical workspaces. Plaintiff's facility was designated non-essential, and operations ceased effective March 24, 2020.

Plaintiff submitted a claim for business income losses on April 15, 2020. Defendant denied the claim on May 30, 2020, citing a virus exclusion endorsement (form CP 10 40) that excluded coverage for "loss or damage caused directly or indirectly by...any virus, bacterium or other microorganism..."

Plaintiff argues that the civil authority provision of the policy was independently triggered, as government orders prohibited access to the premises, regardless of whether physical property damage occurred.

HOLDING: The court granted partial summary judgment to plaintiff on the civil authority issue.

REASONING: The policy's civil authority provision provided coverage when a covered loss caused governmental authority to prohibit access to the insured premises. While the virus exclusion barred coverage for virus-related losses, the civil authority prohibition was a separate, independent trigger.

The governor's proclamation specifically cited the presence of COVID-19 in the community as the reason for the prohibition. However, the causal chain involved multiple links: the virus, the disease, the governmental response, and the prohibition.

The court found that ambiguous exclusionary clauses must be construed against the insurer under Washington law. The virus exclusion was intended to address direct physical contamination, not indirect economic consequences of governmental action triggered by the presence of a virus in the community.

ATTORNEYS FOR PLAINTIFF: Perkins & Wallace, LLP
ATTORNEYS FOR DEFENDANT: Hendrick & Crane, P.S.`,
    factSummary: "Manufacturer claimed business interruption due to government-mandated shutdown during pandemic. Insurance denied coverage citing exclusion for viruses. Court examined specific policy language.",
    winningArgument: "Distinction drawn between pandemic as general concept vs specific policy exclusions. Court found ambiguous language must be construed against insurer. Business income coverage triggered by civil authority orders.",
  },
  {
    citation: "2024 FL Dist. Ct. App. 892",
    caseName: "Torres v. Pineview Condominium Association",
    fullJudgment: `DISTRICT COURT OF APPEAL OF THE STATE OF FLORIDA
FOURTH DISTRICT

JUAN TORRES and MARIA TORRES, Appellants,
v.
PINEVIEW CONDOMINIUM ASSOCIATION, INC., Appellee.

2024 FL Dist. Ct. App. 892 (Fla. 4th DCA 2024)

Opinion filed: January 31, 2024

Appeal from the Circuit Court for Palm Beach County; L.Q. Vance, Judge.

CASE NO.: 2022-CA-004892

BACKGROUND: This dispute concerns the interpretation and application of Force Majeure clauses in condominium maintenance fee assessments during the COVID-19 pandemic.

Appellants Juan and Maria Torres are unit owners in the Pineview Condominium, a 156-unit residential complex in Boca Raton, Florida. They have owned Unit 412 since 2015.

On March 9, 2020, Florida Governor Ron DeSantis declared a state of emergency due to COVID-19. On April 1, 2020, the Governor issued Executive Order 20-91 requiring all Floridians to limit their movements outside their homes, with exceptions for essential activities. The order remained in effect until May 4, 2020.

During this period, the Pineview Condominium Association closed common amenities including the pool, gym, and clubhouse. Many unit owners, including the Torreses, experienced financial hardship due to job losses or reduced income.

On April 15, 2020, the Torreses requested a 90-day extension on their quarterly maintenance fees, citing financial hardship caused by the pandemic. The Association approved similar requests from eleven other unit owners, providing payment plans stretching payments over six months without interest or penalties.

However, the Association denied the Torreses' request on April 22, 2020, stating that the governing documents did not permit fee modifications. The Torreses nevertheless remitted partial payment of 50% of the quarterly assessment.

On May 1, 2020, the Association assessed late fees and interest against the Torreses. When payment was not received in full by June 30, 2020, the Association placed a lien on Unit 412.

HOLDING: The trial court erred in granting summary judgment to the Association. The doctrine of equitable estoppel applies.

REASONING: Under Florida law, the doctrine of equitable estoppel prevents a party from enforcing strict contractual rights when that party has made representations or engaged in conduct that leads another party to reasonably believe that such strict enforcement would not occur.

The Association's treatment of eleven similarly situated unit owners created a reasonable expectation that accommodations would be made during the pandemic. By approving payment plans for other owners facing pandemic-related hardship, the Association effectively represented that it would not enforce the strict payment terms against those making similar requests.

The Torreses made a timely request and demonstrated pandemic-related financial hardship. Under these circumstances, the Association's refusal to extend similar accommodations was arbitrary and capricious.

The Association's assertion that the governing documents prohibited fee modifications was undermined by its own practice of approving payment plans, which themselves constituted modifications.

DISSENT: Judge Woods dissented, arguing that the majority improperly rewrote the parties' contractual relationship.

ATTORNEYS FOR APPELLANTS: Friedman & Friedman, P.A.
ATTORNEYS FOR APPELLEE: Becker & Polovin, P.A.`,
    factSummary: "Unit owner claimed Force Majeure excuse for late maintenance fee payment during COVID-19 lockdown. Association had previously approved payment plans for other owners.",
    winningArgument: "Court found that equitable estoppel prevented Association from enforcing strict deadlines when comparable accommodations were made for others. Unclean hands doctrine applied.",
  },
  {
    citation: "2021 NJ Super. Ch. 445",
    caseName: "Kessler v. Haven Property Management",
    fullJudgment: `SUPERIOR COURT OF NEW JERSEY
CHANCERY DIVISION: BERGEN COUNTY

DIANE KESSLER, Plaintiff,
v.
HAVEN PROPERTY MANAGEMENT, LLC, and OAKWOOD REALTY HOLDINGS, LLC, Defendants.

2021 NJ Super. Ch. 445 (N.J. Super. Ct. Ch. Div. 2021)

Decided: September 3, 2021

Civil Action No. BER-C-45-20

PLAINTIFF'S MOTION FOR SUMMARY JUDGMENT GRANTED IN PART.

NATURE OF ACTION: Action for constructive eviction, breach of the implied warranty of habitability, and damages arising from landlord's failure to repair persistent water intrusion and mold conditions.

FACTS: Plaintiff Diane Kessler entered into a residential lease agreement for Apartment 7B at 445 Palisade Avenue, Cliffside Park, New Jersey, commencing September 1, 2018. Monthly rent was $2,850.

Beginning in January 2019, plaintiff noticed water stains appearing on the ceiling in the living room and bedroom. She reported the issue to defendant Haven Property Management, the managing agent, on January 15, 2019.

Over the following eighteen months, plaintiff made twenty-three documented repair requests. While defendant made occasional attempts to patch the roof, the underlying problem was never resolved. Water intrusion continued, particularly during heavy rains.

By August 2019, plaintiff observed mold growth on walls and furniture. She obtained a professional inspection confirming the presence of Stachybotrys chartarum (black mold) and Aspergillus. Plaintiff experienced increasing respiratory symptoms during this period.

Plaintiff notified defendants on October 1, 2019, that she was vacating the premises due to the uninhabitable conditions. She subsequently relocated to a temporary residence at her own expense.

HOLDING: Plaintiff is entitled to summary judgment on the issue of constructive eviction and breach of the implied warranty of habitability.

REASONING: Under New Jersey law, a landlord's failure to maintain premises in a habitable condition may constitute a breach of the lease agreement and the implied warranty of habitability.

The court found that defendants' repeated failures to address known defects over an extended period of eighteen months demonstrated a conscious disregard for their obligations. The persistence of the water intrusion despite multiple repair attempts indicated that the repairs were inadequate.

The presence of toxic mold in concentrations exceeding recommended guidelines rendered the premises uninhabitable. Defendants' own experts conceded that the conditions were not consistent with healthy indoor air quality.

The court rejected defendants' argument that plaintiff's continued occupation of the premises waived her claims. The evidence showed that plaintiff remained only because she lacked alternative housing, not because she accepted the conditions.

DAMAGES AWARDED: Court awarded plaintiff the following: (1) Return of security deposit; (2) Relocation expenses of $8,400; (3) Alternative housing costs of $15,600; (4) Medical expenses of $4,230; (5) Emotional distress damages of $12,000.

ATTORNEYS FOR PLAINTIFF: Ginsburg & Kohn, LLC
ATTORNEYS FOR DEFENDANTS: Mandel & Sills, LLP`,
    factSummary: "Tenant sued for constructive eviction after persistent roof leaks despite multiple repair requests over 18 months. Property also had ongoing mold issues from water intrusion.",
    winningArgument: "Court held that landlord's repeated failures to address known defects over extended period constituted breach of implied warranty of habitability. Awarded damages including relocation costs.",
  },
  {
    citation: "2023 GA Ct. Appeals 112",
    caseName: "Evergreen Holdings v. Crestview Apartments",
    fullJudgment: `IN THE COURT OF APPEALS OF THE STATE OF GEORGIA
SECOND DIVISION

EVERGREEN HOLDINGS, INC., Appellant,
v.
CRESTVIEW APARTMENTS, LLC, Appellee.

2023 GA Ct. Appeals 112 (Ga. Ct. App. 2023)

Decided: February 15, 2023

Reconsideration denied March 8, 2023.

Appeal from the Superior Court of Fulton County.

CASE NO. A22A1234

BACKGROUND: This appeal concerns the enforceability of a lease termination agreement executed during a natural disaster and the application of Force Majeure clauses.

Evergreen Holdings, Inc. (Evergreen) is a commercial real estate development company. Crestview Apartments, LLC (Crestview) owns the Crestview Gardens apartment complex in Atlanta, Georgia.

On March 1, 2022, the parties executed a purchase and sale agreement for the Crestview Gardens property for a purchase price of $18.5 million. The closing was scheduled for June 30, 2022.

Evergreen paid a $500,000 earnest money deposit upon execution of the agreement. The deposit was to be held in escrow by Crestview's attorney.

On May 12, 2022, a tornado struck the Atlanta metropolitan area, causing significant damage to the Crestview Gardens property. The building's roof was substantially destroyed, and several units were rendered uninhabitable.

Crestview notified Evergreen of the damage on May 14, 2022, and indicated that repairs would take approximately four months. On May 20, 2022, Evergreen sent a letter purporting to terminate the agreement under the Force Majeure clause, which provided that neither party would be liable for delays caused by "acts of God, natural disasters, or other events beyond the reasonable control of the parties."

Crestview refused to return the earnest money deposit, claiming that Evergreen's obligation to purchase was not excused by the tornado damage.

Following mediation, the parties executed a "Mutual Termination and Release Agreement" on July 15, 2022. Under this agreement, Crestview retained $200,000 of the earnest money as consideration for the termination, and Evergreen received return of $300,000.

Evergreen subsequently filed suit claiming that the retention of $200,000 was improper because the Force Majeure clause excused performance.

HOLDING: The trial court did not err in granting summary judgment to Crestview.

REASONING: The Force Majeure clause in the purchase and sale agreement did not automatically terminate the parties' obligations. Rather, it suspended performance during the pendency of the force majeure event.

More significantly, the parties executed a subsequent written agreement that specifically addressed the termination of their relationship and the disposition of the earnest money. This agreement superseded the original contract terms.

Under Georgia law, a valid release agreement is binding on the parties. Evergreen was a sophisticated commercial entity that was represented by counsel during the execution of the Mutual Termination and Release Agreement.

The argument that the release was executed under economic duress was rejected. While Evergreen may have faced a difficult situation, economic pressure alone does not constitute the kind of duress that invalidates a contract.

The retention of $200,000 as consideration for the termination was upheld.

ATTORNEYS FOR APPELLANT: Baker & Caldwell, P.C.
ATTORNEYS FOR APPELLEE: Wright & Stevens, LLC`,
    factSummary: "Dispute over lease termination during natural disaster. Landlord claimed Force Majeure excuse for inability to deliver premises. Tenant had already paid deposit and partial rent.",
    winningArgument: "Court found that Force Majeure clause did not excuse landlord's pre-existing obligations. Deposit return ordered with interest. Partial rent as consideration for early termination agreement upheld.",
  },
  {
    citation: "2024 CA1 Cir. 89",
    caseName: "Meridian Trust v. Coastal Development",
    fullJudgment: `UNITED STATES COURT OF APPEALS
FIRST CIRCUIT

MERIDIAN TRUST, Plaintiff-Appellant,
v.
COASTAL DEVELOPMENT PARTNERS, LP, Defendant-Appellee.

2024 CA1 Cir. 89 (1st Cir. 2024)

Appeal from the United States District Court
for the District of Puerto Rico

No. 23-1562
[January 22, 2024]

Before: Lynch, Circuit Judge, and Siler and Bjorklund, Circuit Judges.

OPINION PER CURIAM.

This case involves the interpretation of a Force Majeure clause in a loan agreement following Hurricane Maria's devastation of Puerto Rico in September 2017.

BACKGROUND: In 2014, Coastal Development Partners, LP obtained a $25 million construction loan from Meridian Trust. The loan was secured by a mortgage on a resort development project in Rincón, Puerto Rico. The loan agreement included a Force Majeure clause excusing borrower defaults caused by "natural disasters, hurricanes, earthquakes, or other catastrophic events."

Hurricane Maria made landfall in Puerto Rico on September 20, 2017, as a Category 4 hurricane, causing catastrophic damage throughout the island. The resort construction site was substantially destroyed.

Coastal Development stopped making loan payments in November 2017, citing the Force Majeure clause. Meridian Trust commenced foreclosure proceedings in January 2018.

The district court granted summary judgment to Meridian Trust, finding that the Force Majeure clause did not excuse the borrower's obligation to repay the loan.

HOLDING: Affirmed.

REASONING: The Force Majeure clause in this case excused delays in construction, not non-payment of the loan itself.

The clause stated: "In the event of a Force Majeure event causing delay in construction of the Project, the Borrower shall not be liable for damages for such delay." The parties' use of the word "delay" indicates an intent to address timing, not payment obligations.

The obligation to repay the loan was separate from the obligation to complete construction. The borrower remained contractually obligated to repay even if the underlying project was delayed or destroyed.

The court also noted that Force Majeure clauses are typically construed narrowly and do not excuse obligations unrelated to the specific risks contemplated by the clause.

DISSENT: Judge Siler dissented, arguing that the majority's interpretation was too narrow and that the destruction of the collateral effectively frustrated the purpose of the loan agreement.

ATTORNEYS FOR APPELLANT: Stone & Masters, P.C.
ATTORNEYS FOR APPELLEE: Reyes & Díaz, P.S.C.`,
    factSummary: "Construction loan default after hurricane destroyed the project. Force Majeure clause in loan agreement. Court distinguished between construction delays and loan repayment obligations.",
    winningArgument: "Force Majeure clause specifically addressed construction delays, not loan repayment. Separate obligations under the loan agreement. Court applies narrow interpretation of Force Majeure clauses.",
  },
  {
    citation: "2022 TX App. Lex 4521",
    caseName: "Red River Properties v. Montgomery",
    fullJudgment: `COURT OF APPEALS OF TEXAS
FOURTH DISTRICT, SAN ANTONIO

RED RIVER PROPERTIES, LLC, Appellant,
v.
GERALD MONTGOMERY and wife, LINDA MONTGOMERY, Appellees.

2022 TX App. Lex 4521 (Tex. App.—San Antonio 2022)

Filed: April 6, 2022

From the 37th Judicial District Court, Bexar County

Trial Court No. 2020-CI-24589

FACTS: In 2017, Red River Properties, LLC (Red River) purchased a commercial office building at 8000 I-10 West, San Antonio, Texas, at a foreclosure sale. The previous owner had defaulted on both the mortgage and property taxes.

Red River leased Suite 200 to Gerald and Linda Montgomery under a five-year commercial lease commencing January 1, 2018. Monthly rent was $8,500.

In March 2020, the State of Texas issued executive orders limiting business operations in response to the COVID-19 pandemic. The Montgomerys operated a tax preparation and accounting firm from Suite 200.

The Montgomerys initially transitioned to remote operations but continued to access the office periodically. They paid full rent through May 2020.

On June 1, 2020, the Montgomerys notified Red River that they were vacating Suite 200 effective immediately, citing government orders and the economic impact of the pandemic. They left behind office furniture and equipment valued at approximately $15,000.

Red River filed suit for breach of lease, seeking unpaid rent for the remaining lease term plus damages.

DEFENSE: The Montgomerys raised the defense of impossibility or frustration of purpose, arguing that the pandemic and government orders made it impossible to operate their business from the leased premises.

HOLDING: The trial court erred in instructing the jury on the Montgomerys' affirmative defense.

REASONING: Under Texas law, the doctrines of impossibility and frustration of purpose are narrow defenses that apply only when an unforeseen event destroys the very subject matter of the contract or renders a party's performance impossible in an absolute sense.

The COVID-19 pandemic and associated government orders, while causing significant economic disruption, did not render the Montgomerys' performance impossible. The lease premises remained accessible and usable; the Montgomerys simply chose to operate remotely.

The distinction is critical: a party is not excused from contractual obligations merely because performance has become more difficult or less profitable. The obligation to pay rent was not impossible—it was merely inconvenient.

Furthermore, the Montgomerys' continued use of the premises through May 2020 demonstrated that they believed the premises remained usable. Their decision to vacate was an economic choice, not a legal necessity.

JURY INSTRUCTION ERROR: The trial court erred in instructing the jury on the frustration of purpose defense because, as a matter of law, the defense was inapplicable to these facts.

REMAND: Case remanded for new trial on damages.

ATTORNEYS FOR APPELLANT: Thompson & Kaine, LLP
ATTORNEYS FOR APPELLEES: Jackson & Moody, P.C.`,
    factSummary: "Commercial tenant vacated premises during pandemic citing impossibility. Landlord sued for breach of lease. Court rejected impossibility defense when premises remained accessible.",
    winningArgument: "Impossibility defense requires absolute impossibility, not mere economic hardship. Tenant's continued access to premises and remote operations demonstrated usability. Performance was inconvenient, not impossible.",
  },
  {
    citation: "2023 WA Supreme Ct. 45",
    caseName: "Sundown Industries v. Pacific Manufacturing",
    fullJudgment: `SUPREME COURT OF WASHINGTON
Olympia

SUNDOWN INDUSTRIES, INC., Petitioner,
v.
PACIFIC MANUFACTURING CO., Respondent.

2023 WA Supreme Ct. 45 (Wash. 2023)

January 12, 2023

ISSUES: Whether a Force Majeure clause that does not specifically mention pandemics or government orders nonetheless protects a party from liability when performance is prevented by COVID-19 related government orders.

FACTS: Sundown Industries operated a metal fabrication facility in Spokane, Washington. Pacific Manufacturing was a major customer, purchasing industrial components under a requirements contract signed in 2019.

The contract contained a Force Majeure clause providing: "Neither party shall be liable to the other for any failure or delay in performing its obligations under this Agreement where such failure or delay arises from circumstances beyond the reasonable control of that party, including but not limited to: fire, flood, earthquake, war, terrorism, or government action."

In March 2020, Governor Inslee issued Executive Order 20-25, requiring all non-essential businesses to cease operations. Metal fabrication was not designated essential. Sundown closed its facility on March 26, 2020, and was unable to fulfill orders for Pacific Manufacturing through May 31, 2020.

Pacific Manufacturing sourced components from alternative suppliers at significantly higher prices and sued Sundown for the price differential and consequential damages.

HOLDING: The Force Majeure clause did excuse Sundown's performance during the period of the government order.

REASONING: The Force Majeure clause broadly referenced "government action" as an excusing event. While the clause did not specifically mention pandemics, a pandemic is precisely the type of catastrophic event that Force Majeure clauses are designed to address.

The phrase "circumstances beyond the reasonable control of that party" encompasses the government orders issued in response to the pandemic. Sundown had no control over the Governor's executive order and could not have reasonably anticipated such an event when the contract was signed.

The court rejected Pacific Manufacturing's argument that the Force Majeure clause must specifically enumerate pandemics. Such a reading would defeat the purpose of Force Majeure clauses, which is to allocate risks from unforeseen events.

However, the court also held that the Force Majeure clause only excused Sundown from liability for direct damages caused by the non-performance. It did not excuse Sundown from its general obligation to resume performance when the Force Majeure event ended.

Consequential damages were not recoverable under these circumstances because both parties were operating under the same general economic conditions, and the contract was designed to allocate this risk.

ATTORNEYS FOR PETITIONER: Davis & Armstrong, P.S.
ATTORNEYS FOR RESPONDENT: Miller & Nakamura, LLP`,
    factSummary: "Metal fabricator could not fulfill customer orders due to government-mandated closure during pandemic. Customer sued for price differential. Force Majeure clause mentioned government action.",
    winningArgument: "Broad Force Majeure clause covering government action excused performance during pandemic closure. Specific enumeration of pandemic not required when 'government action' is listed. Both parties operating under same conditions.",
  },
];

async function main() {
  console.log("Starting database seed...");

  for (const precedent of precedents) {
    const { generateEmbedding } = await import("../src/lib/openai.js");

    console.log(`Processing: ${precedent.caseName}`);

    const factPattern = precedent.factSummary + " " + precedent.winningArgument;

    try {
      const embedding = await generateEmbedding(factPattern);

      await prisma.$executeRaw`
        INSERT INTO "PrecedentCase" (
          id, "caseName", citation, "fullJudgment", "factSummary", "winningArgument", "factEmbedding", "createdAt"
        ) VALUES (
          gen_random_uuid(),
          ${precedent.caseName},
          ${precedent.citation},
          ${precedent.fullJudgment},
          ${precedent.factSummary},
          ${precedent.winningArgument},
          ${`[${embedding.join(",")}]`}::vector,
          NOW()
        )
        ON CONFLICT (citation) DO NOTHING
      `;

      console.log(`  ✓ Seeded: ${precedent.citation}`);
    } catch (error) {
      console.error(`  ✗ Failed: ${precedent.citation}`, error);
    }
  }

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
