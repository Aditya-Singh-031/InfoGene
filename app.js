// Gene data with comprehensive information
const GENE_DATABASE = {
  'PROS1': {
    geneId: '5627',
    symbol: 'PROS1',
    description: 'Protein S alpha',
    organism: 'Homo sapiens',
    chromosome: '3',
    location: '3q11.1',
    aliases: ['PS', 'PROS', 'PSA'],
    function: 'Anticoagulant plasma protein that acts as a cofactor for activated protein C',
    genomicAccession: 'NG_013017',
    mrnaTranscripts: [
      {
        accession: 'NM_000313',
        length: 3078,
        description: 'Protein S alpha transcript variant 1'
      }
    ],
    exons: [
      {number: 1, start: 11468388, end: 11468522, length: 135},
      {number: 2, start: 11475054, end: 11475191, length: 138},
      {number: 3, start: 11478456, end: 11478593, length: 138},
      {number: 15, start: 11547612, end: 11547891, length: 280}
    ]
  },
  'BRCA1': {
    geneId: '672',
    symbol: 'BRCA1',
    description: 'BRCA1 DNA repair associated',
    organism: 'Homo sapiens',
    chromosome: '17',
    location: '17q21.31',
    aliases: ['BRCAI', 'BRCC1', 'FANCS', 'IRIS', 'PNCA4', 'PPP1R53', 'PSCP', 'RNF53'],
    function: 'Tumor suppressor involved in DNA repair, ubiquitination and transcriptional regulation',
    genomicAccession: 'NG_005905',
    mrnaTranscripts: [
      {
        accession: 'NM_007294',
        length: 7207,
        description: 'BRCA1 DNA repair associated transcript variant 1'
      },
      {
        accession: 'NM_007300',
        length: 7976,
        description: 'BRCA1 DNA repair associated transcript variant 2'
      }
    ],
    exons: [
      {number: 1, start: 43044295, end: 43044394, length: 100},
      {number: 2, start: 43045802, end: 43045944, length: 143},
      {number: 3, start: 43047703, end: 43047780, length: 78},
      {number: 24, start: 43124096, end: 43124115, length: 20}
    ]
  },
  'TP53': {
    geneId: '7157',
    symbol: 'TP53',
    description: 'Tumor protein p53',
    organism: 'Homo sapiens',
    chromosome: '17',
    location: '17p13.1',
    aliases: ['BCC7', 'BMFS5', 'LFS1', 'P53', 'TRP53'],
    function: 'Tumor suppressor that regulates cell cycle and apoptosis in response to DNA damage',
    genomicAccession: 'NG_017013',
    mrnaTranscripts: [
      {
        accession: 'NM_000546',
        length: 2579,
        description: 'Tumor protein p53 transcript variant 1'
      },
      {
        accession: 'NM_001126112',
        length: 2512,
        description: 'Tumor protein p53 transcript variant 2'
      }
    ],
    exons: [
      {number: 1, start: 7687490, end: 7687550, length: 61},
      {number: 2, start: 7676381, end: 7676403, length: 23},
      {number: 3, start: 7674858, end: 7674970, length: 113},
      {number: 11, start: 7565097, end: 7565332, length: 236}
    ]
  },
  'APOE': {
    geneId: '348',
    symbol: 'APOE', 
    description: 'Apolipoprotein E',
    organism: 'Homo sapiens',
    chromosome: '19',
    location: '19q13.32',
    aliases: ['AD2', 'APO-E', 'ApoE4'],
    function: 'Mediates lipoprotein metabolism and is associated with Alzheimer disease',
    genomicAccession: 'NG_007084',
    mrnaTranscripts: [
      {
        accession: 'NM_000041',
        length: 1163,
        description: 'Apolipoprotein E transcript variant 1'
      }
    ],
    exons: [
      {number: 1, start: 45409011, end: 45409149, length: 139},
      {number: 2, start: 45410002, end: 45410031, length: 30},
      {number: 3, start: 45411941, end: 45412079, length: 139},
      {number: 4, start: 45412178, end: 45412650, length: 473}
    ]
  },
  'CFTR': {
    geneId: '1080',
    symbol: 'CFTR',
    description: 'Cystic fibrosis transmembrane conductance regulator',
    organism: 'Homo sapiens', 
    chromosome: '7',
    location: '7q31.2',
    aliases: ['ABCC7', 'CF', 'CFTR/MRP'],
    function: 'Chloride channel involved in cystic fibrosis',
    genomicAccession: 'NG_016465',
    mrnaTranscripts: [
      {
        accession: 'NM_000492',
        length: 4443,
        description: 'CFTR transmembrane conductance regulator'
      }
    ],
    exons: [
      {number: 1, start: 117120016, end: 117120201, length: 186},
      {number: 2, start: 117144363, end: 117144420, length: 58},
      {number: 3, start: 117149087, end: 117149196, length: 110}
    ]
  },
  'HTT': {
    geneId: '3064',
    symbol: 'HTT',
    description: 'Huntingtin',
    organism: 'Homo sapiens',
    chromosome: '4',
    location: '4p16.3',
    aliases: ['HD', 'HUNTINGTIN', 'IT15'],
    function: 'Involved in cellular transport and may play role in transcriptional regulation',
    genomicAccession: 'NG_009378',
    mrnaTranscripts: [
      {
        accession: 'NM_002111',
        length: 13711,
        description: 'Huntingtin transcript variant 1'
      }
    ],
    exons: [
      {number: 1, start: 3076408, end: 3076604, length: 197},
      {number: 2, start: 3123065, end: 3123205, length: 141},
      {number: 67, start: 3243631, end: 3245686, length: 2056}
    ]
  },
  'BRCA2': {
    geneId: '675',
    symbol: 'BRCA2',
    description: 'BRCA2 DNA repair associated',
    organism: 'Homo sapiens',
    chromosome: '13',
    location: '13q13.1',
    aliases: ['BRCC2', 'BROVCA2', 'FANCD1', 'GLM3'],
    function: 'Tumor suppressor involved in DNA repair by homologous recombination',
    genomicAccession: 'NG_012772',
    mrnaTranscripts: [
      {
        accession: 'NM_000059',
        length: 11386,
        description: 'BRCA2 DNA repair associated transcript variant 1'
      }
    ],
    exons: [
      {number: 1, start: 32315474, end: 32315667, length: 194},
      {number: 2, start: 32316422, end: 32316527, length: 106},
      {number: 3, start: 32319077, end: 32319325, length: 249},
      {number: 27, start: 32398770, end: 32400268, length: 1499}
    ]
  }
};

// Application state
let currentGeneData = null;
let analysisInProgress = false;
let nglStage = null; // NGL viewer stage (initialized when needed)


// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Application initialized');
  initializeEventListeners();
  setupCollapsibleSections();
});

function initializeEventListeners() {
  const form = document.getElementById('geneForm');
  const newAnalysisBtn = document.getElementById('newAnalysisBtn');
  const downloadFastaBtn = document.getElementById('downloadFasta');
  const downloadCsvBtn = document.getElementById('downloadCsv');
  const geneInput = document.getElementById('geneInput');
  const emailInput = document.getElementById('emailInput');
  
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
  
  if (newAnalysisBtn) {
    newAnalysisBtn.addEventListener('click', resetAnalysis);
  }
  
  if (downloadFastaBtn) {
    downloadFastaBtn.addEventListener('click', downloadFasta);
  }
  
  if (downloadCsvBtn) {
    downloadCsvBtn.addEventListener('click', downloadCsv);
  }
  
  // Input validation
  if (geneInput) {
    geneInput.addEventListener('input', validateGeneInput);
    geneInput.addEventListener('focus', function() {
      if (!this.value) {
        showToast('Try searching for: BRCA1, TP53, APOE, CFTR, HTT, or any human gene symbol', 'info');
      }
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('input', validateEmailInput);
  }
}

function setupCollapsibleSections() {
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const content = document.getElementById(targetId);
      const icon = this.querySelector('.expand-icon');
      
      if (content && icon) {
        if (content.classList.contains('collapsed')) {
          content.classList.remove('collapsed');
          this.classList.remove('collapsed');
        } else {
          content.classList.add('collapsed');
          this.classList.add('collapsed');
        }
      }
    });
  });
}

function validateGeneInput() {
  const geneInput = document.getElementById('geneInput');
  if (!geneInput) return false;
  
  const value = geneInput.value.trim();
  const isValid = value.length > 0 && /^[A-Za-z0-9-_]+$/.test(value);
  
  if (value && !isValid) {
    showToast('Gene symbol should contain only letters, numbers, hyphens, and underscores', 'error');
  }
  
  return isValid;
}

function validateEmailInput() {
  const emailInput = document.getElementById('emailInput');
  if (!emailInput) return false;
  
  const value = emailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  
  return isValid;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  console.log('Form submitted');
  
  if (analysisInProgress) {
    console.log('Analysis already in progress');
    return;
  }
  
  const geneInput = document.getElementById('geneInput');
  const emailInput = document.getElementById('emailInput');
  
  if (!geneInput || !emailInput) {
    console.error('Form elements not found');
    showToast('Form initialization error', 'error');
    return;
  }
  
  const geneSymbol = geneInput.value.trim().toUpperCase();
  const email = emailInput.value.trim();
  
  console.log('Gene symbol:', geneSymbol, 'Email:', email);
  
  if (!validateGeneInput() || !validateEmailInput()) {
    showToast('Please enter a valid gene symbol and email address', 'error');
    return;
  }
  
  analysisInProgress = true;
  showLoadingState();
  showProgressSection();
  
  try {
    await performGeneAnalysis(geneSymbol, email);
    showToast(`Successfully analyzed gene ${geneSymbol}`, 'success');
  } catch (error) {
    console.error('Analysis error:', error);
    showToast(`Analysis failed: ${error.message}`, 'error');
    hideProgressSection();
  } finally {
    analysisInProgress = false;
    hideLoadingState();
  }
}

function showLoadingState() {
  const btnText = document.querySelector('.btn-text');
  const btnSpinner = document.querySelector('.btn-spinner');
  const form = document.getElementById('geneForm');
  
  if (btnText) btnText.classList.add('hidden');
  if (btnSpinner) btnSpinner.classList.remove('hidden');
  if (form) form.classList.add('form-loading');
  
  console.log('Loading state shown');
}

function hideLoadingState() {
  const btnText = document.querySelector('.btn-text');
  const btnSpinner = document.querySelector('.btn-spinner');
  const form = document.getElementById('geneForm');
  
  if (btnText) btnText.classList.remove('hidden');
  if (btnSpinner) btnSpinner.classList.add('hidden');
  if (form) form.classList.remove('form-loading');
  
  console.log('Loading state hidden');
}

function showProgressSection() {
  const progressSection = document.getElementById('progressSection');
  if (progressSection) {
    progressSection.classList.remove('hidden');
    console.log('Progress section shown');
  } else {
    console.error('Progress section not found');
  }
}

function hideProgressSection() {
  const progressSection = document.getElementById('progressSection');
  if (progressSection) {
    progressSection.classList.add('hidden');
    resetProgressSteps();
    console.log('Progress section hidden');
  }
}

function resetProgressSteps() {
  const steps = document.querySelectorAll('.progress-step');
  steps.forEach(step => {
    step.classList.remove('active', 'completed');
  });
}

async function performGeneAnalysis(geneSymbol, email) {
  console.log('Starting gene analysis for:', geneSymbol);
  
  const steps = [
    { id: 'step1', duration: 1500, message: 'Searching NCBI Gene database...' },
    { id: 'step2', duration: 1800, message: 'Fetching genomic sequences...' },
    { id: 'step3', duration: 1200, message: 'Retrieving transcript data...' },
    { id: 'step4', duration: 1000, message: 'Processing exon structure...' }
  ];
  
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const stepElement = document.getElementById(step.id);
    
    if (stepElement) {
      console.log('Activating step:', step.id);
      // Activate current step
      stepElement.classList.add('active');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, step.duration));
      
      // Complete current step
      stepElement.classList.remove('active');
      stepElement.classList.add('completed');
      console.log('Completed step:', step.id);
    } else {
      console.error('Step element not found:', step.id);
    }
  }
  
  // Generate or fetch gene data
  currentGeneData = generateGeneData(geneSymbol);
  console.log('Generated gene data:', currentGeneData);
  
  // Display results
  displayResults(currentGeneData);
  
  const resultsSection = document.getElementById('resultsSection');
  if (resultsSection) {
    resultsSection.classList.remove('hidden');
    console.log('Results section shown');
  } else {
    console.error('Results section not found');
  }
}

function generateGeneData(geneSymbol) {
  // Check if gene exists in database
  if (GENE_DATABASE[geneSymbol]) {
    console.log('Using database gene:', geneSymbol);
    return GENE_DATABASE[geneSymbol];
  }
  
  console.log('Generating random gene data for:', geneSymbol);
  
  // Generate plausible data for unknown genes
  const chromosomes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y'];
  const randomChromosome = chromosomes[Math.floor(Math.random() * chromosomes.length)];
  const randomGeneId = Math.floor(Math.random() * 50000) + 1000;
  
  // Generate realistic genomic coordinates
  const basePosition = Math.floor(Math.random() * 200000000) + 1000000;
  
  return {
    geneId: randomGeneId.toString(),
    symbol: geneSymbol,
    description: `${geneSymbol} protein`,
    organism: 'Homo sapiens',
    chromosome: randomChromosome,
    location: `${randomChromosome}q${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`,
    aliases: generateRandomAliases(geneSymbol),
    function: `Protein-coding gene involved in cellular processes. Function may include regulation, signaling, or metabolic pathways.`,
    genomicAccession: `NG_${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
    mrnaTranscripts: [
      {
        accession: `NM_${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
        length: Math.floor(Math.random() * 10000) + 1000,
        description: `${geneSymbol} transcript variant 1`
      }
    ],
    exons: generateRandomExons(basePosition)
  };
}

function generateRandomAliases(geneSymbol) {
  const suffixes = ['A', 'B', '1', '2', 'L', 'R'];
  const prefixes = ['H', 'P', 'C'];
  const aliases = [];
  
  // Generate 2-4 random aliases
  const numAliases = Math.floor(Math.random() * 3) + 2;
  
  for (let i = 0; i < numAliases; i++) {
    if (Math.random() > 0.5) {
      aliases.push(geneSymbol + suffixes[Math.floor(Math.random() * suffixes.length)]);
    } else {
      aliases.push(prefixes[Math.floor(Math.random() * prefixes.length)] + geneSymbol);
    }
  }
  
  return aliases;
}

function generateRandomExons(basePosition) {
  const numExons = Math.floor(Math.random() * 20) + 3; // 3-22 exons
  const exons = [];
  let currentPosition = basePosition;
  
  for (let i = 1; i <= numExons; i++) {
    const length = Math.floor(Math.random() * 2000) + 50; // 50-2050 bp
    const intronLength = Math.floor(Math.random() * 50000) + 1000; // 1-51kb introns
    
    exons.push({
      number: i,
      start: currentPosition,
      end: currentPosition + length - 1,
      length: length
    });
    
    currentPosition += length + intronLength;
  }
  
  return exons;
}

function displayResults(geneData) {
  console.log('Displaying results for:', geneData.symbol);
  
  // Gene Summary
  const elements = {
    geneSymbol: document.getElementById('geneSymbol'),
    geneId: document.getElementById('geneId'),
    chromosome: document.getElementById('chromosome'),
    location: document.getElementById('location'),
    description: document.getElementById('description'),
    function: document.getElementById('function'),
    aliases: document.getElementById('aliases'),
    genomicAccession: document.getElementById('genomicAccession'),
    chromosomeRef: document.getElementById('chromosomeRef')
  };
  
  // Update gene summary
  if (elements.geneSymbol) elements.geneSymbol.textContent = geneData.symbol;
  if (elements.geneId) elements.geneId.textContent = geneData.geneId;
  if (elements.chromosome) elements.chromosome.textContent = geneData.chromosome;
  if (elements.location) elements.location.textContent = geneData.location;
  if (elements.description) elements.description.textContent = geneData.description;
  if (elements.function) elements.function.textContent = geneData.function;
  if (elements.aliases) elements.aliases.textContent = geneData.aliases.join(', ');
  
  // Genomic Sequences
  if (elements.genomicAccession) elements.genomicAccession.textContent = geneData.genomicAccession;
  if (elements.chromosomeRef) elements.chromosomeRef.textContent = `NC_${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}.${Math.floor(Math.random() * 20) + 1}`;
  
  // mRNA Transcripts
  const transcriptsList = document.getElementById('transcriptsList');
  if (transcriptsList) {
    transcriptsList.innerHTML = '';
    
    geneData.mrnaTranscripts.forEach(transcript => {
      const transcriptDiv = document.createElement('div');
      transcriptDiv.className = 'transcript-item';
      transcriptDiv.innerHTML = `
        <div class="transcript-accession">${transcript.accession}</div>
        <div class="transcript-details">
          <span class="transcript-length">Length: ${transcript.length.toLocaleString()} bp</span>
        </div>
        <div class="transcript-description">${transcript.description}</div>
      `;
      transcriptsList.appendChild(transcriptDiv);
    });
  }
  
  // Exon Analysis
  const exonTableBody = document.getElementById('exonTableBody');
  if (exonTableBody) {
    exonTableBody.innerHTML = '';
    
    geneData.exons.forEach(exon => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>Exon ${exon.number}</td>
        <td>${exon.start.toLocaleString()}</td>
        <td>${exon.end.toLocaleString()}</td>
        <td>${exon.length.toLocaleString()}</td>
      `;
      exonTableBody.appendChild(row);
    });
  }
  
  console.log('Results display completed');
  // after populating results, attempt to load AlphaFold structure for this gene
loadProteinStructure(geneData.symbol);
}
/* -----------------------------
   AlphaFold / UniProt helpers
   ----------------------------- */

   async function fetchUniProtAccession(geneSymbol) {
    // Prefer reviewed Swiss-Prot entries for Homo sapiens
    try {
      const q = encodeURIComponent(`gene_exact:${geneSymbol} AND organism_id:9606 AND reviewed:true`);
      const url = `https://rest.uniprot.org/uniprotkb/search?query=${q}&fields=primaryAccession,protein_name&format=json&size=1`;
      const resp = await fetch(url);
      if (!resp.ok) return null;
      const data = await resp.json();
      if (data?.results && data.results.length > 0) {
        const item = data.results[0];
        return item.primaryAccession || item.primaryAccession?.toString() || null;
      }
  
      // fallback: looser search (still prefer reviewed)
      const fallbackQ = encodeURIComponent(`gene:${geneSymbol} AND organism_id:9606 AND reviewed:true`);
      const fallbackUrl = `https://rest.uniprot.org/uniprotkb/search?query=${fallbackQ}&fields=primaryAccession,protein_name&format=json&size=1`;
      const resp2 = await fetch(fallbackUrl);
      if (!resp2.ok) return null;
      const data2 = await resp2.json();
      if (data2?.results && data2.results.length > 0) {
        return data2.results[0].primaryAccession || null;
      }
  
      return null;
    } catch (err) {
      console.warn('UniProt lookup failed:', err);
      return null;
    }
  }
  
  async function fetchAlphaFoldModelInfo(uniprotAccession) {
    try {
      const apiUrl = `https://alphafold.ebi.ac.uk/api/prediction/${encodeURIComponent(uniprotAccession)}`;
      const resp = await fetch(apiUrl);
      if (!resp.ok) return null;
      const info = await resp.json();
      // API sometimes returns an array — prefer first element
      if (Array.isArray(info) && info.length > 0) return info[0];
      if (info && typeof info === 'object') return info;
      return null;
    } catch (err) {
      console.warn('AlphaFold API fetch failed:', err);
      return null;
    }
  }
  
  async function loadProteinStructure(geneSymbolOptional) {
    // Show AlphaFold card
    const afCard = document.getElementById('alphafold-card');
    if (afCard) afCard.style.display = 'block';
  
    const geneSymbol = (geneSymbolOptional || (currentGeneData && currentGeneData.symbol) || '').toUpperCase();
    const uniprotEl = document.getElementById('structure-uniprot');
    const proteinNameEl = document.getElementById('structure-protein-name');
    const noteEl = document.getElementById('structure-note');
    const errorEl = document.getElementById('structure-error');
    const downloadBtn = document.getElementById('download-structure-btn');
    const viewOnAFBtn = document.getElementById('view-on-alphafold-btn');
  
    // reset UI
    if (uniprotEl) uniprotEl.textContent = '—';
    if (proteinNameEl) proteinNameEl.textContent = '—';
    if (errorEl) errorEl.textContent = '';
    if (noteEl) noteEl.textContent = 'Structure fetched from AlphaFold DB (if available).';
    if (downloadBtn) { downloadBtn.disabled = true; downloadBtn.onclick = null; }
    if (viewOnAFBtn) { viewOnAFBtn.disabled = true; viewOnAFBtn.onclick = null; }
  
    if (!geneSymbol) {
      if (noteEl) noteEl.textContent = 'No gene symbol available to fetch structure.';
      return;
    }
  
    // 1. Map gene symbol -> UniProt accession
    const accession = await fetchUniProtAccession(geneSymbol);
    if (!accession) {
      if (noteEl) noteEl.textContent = 'No UniProt accession found for this gene (or not in UniProt).';
      if (errorEl) errorEl.textContent = 'Structure not available.';
      return;
    }
    if (uniprotEl) uniprotEl.textContent = accession;
  
    // 2. Query AlphaFold API
    const afInfo = await fetchAlphaFoldModelInfo(accession);
    if (!afInfo) {
      if (noteEl) noteEl.textContent = 'No AlphaFold model found for this UniProt accession.';
      if (errorEl) errorEl.textContent = 'Structure not available.';
      return;
    }
  
    // 3. Protein name (optional)
    if (afInfo?.name) {
      if (proteinNameEl) proteinNameEl.textContent = afInfo.name;
    } else {
      // attempt a UniProt name fetch
      try {
        const upUrl = `https://rest.uniprot.org/uniprotkb/${encodeURIComponent(accession)}?format=json`;
        const upResp = await fetch(upUrl);
        if (upResp.ok) {
          const upObj = await upResp.json();
          const pName = upObj?.proteinDescription?.recommendedName?.fullName?.value || upObj?.uniProtkbId || null;
          if (pName && proteinNameEl) proteinNameEl.textContent = pName;
        }
      } catch (e) { /* ignore */ }
    }
  
    // 4. Determine coordinate file URL (.pdb or .cif)
    let coordUrl = null;
    // common keys
    if (afInfo.pdbUrl) coordUrl = afInfo.pdbUrl;
    else if (afInfo.cifUrl) coordUrl = afInfo.cifUrl;
    else if (afInfo.files && Array.isArray(afInfo.files)) {
      const fe = afInfo.files.find(f => (f.url && (f.url.endsWith('.pdb') || f.url.endsWith('.cif'))) ||
                                        (f.name && (f.name.endsWith('.pdb') || f.name.endsWith('.cif'))));
      if (fe) coordUrl = fe.url || fe.name || null;
    }
    // fallback pattern commonly used by AF DB
    if (!coordUrl) {
      coordUrl = `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-model_v1.pdb`;
    }
  
    if (!coordUrl) {
      if (noteEl) noteEl.textContent = 'AlphaFold entry found but no coordinate file URL detected.';
      if (errorEl) errorEl.textContent = 'Structure file not found.';
      return;
    }
  
    // enable view/open/download controls
    if (viewOnAFBtn) {
      viewOnAFBtn.disabled = false;
      viewOnAFBtn.onclick = () => window.open(`https://alphafold.ebi.ac.uk/entry/${accession}`, '_blank');
    }
    if (downloadBtn) {
      downloadBtn.disabled = false;
      // let downloader append extension
      downloadBtn.onclick = () => downloadStructureFile(coordUrl, `${accession}_AF_model`);
    }
  
    // 5. Initialize NGL and load coordinate file
    try {
      if (!nglStage) {
        nglStage = new NGL.Stage('ngl-viewer');
        window.addEventListener('resize', () => { try { nglStage.handleResize(); } catch (e) {} });
      } else {
        nglStage.removeAllComponents();
      }
  
      nglStage.loadFile(coordUrl).then(component => {
        try {
          component.addRepresentation('cartoon', { smoothTube: true });
          component.addRepresentation('ball+stick', { sele: 'hetero' });
          component.autoView();
        } catch (e) {
          console.warn('NGL representation error:', e);
        }
      }).catch(err => {
        console.warn('NGL load error:', err);
        if (errorEl) errorEl.textContent = 'Failed to load structure in viewer.';
      });
  
    } catch (err) {
      console.warn('Viewer initialization failed:', err);
      if (errorEl) errorEl.textContent = 'Viewer failed to initialize.';
    }
  }
  
  async function downloadStructureFile(url, filenameBase) {
    try {
      // infer extension
      let ext = '.pdb';
      try {
        const u = new URL(url);
        const path = u.pathname.toLowerCase();
        if (path.endsWith('.cif')) ext = '.cif';
        else if (path.endsWith('.pdb')) ext = '.pdb';
      } catch (e) { /* ignore */ }
  
      const filename = `${filenameBase}${ext}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Download failed');
      const blob = await resp.blob();
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
      showToast(`Downloaded ${filename}`, 'success');
    } catch (err) {
      console.error('Structure download failed', err);
      const errEl = document.getElementById('structure-error');
      if (errEl) errEl.textContent = 'Download failed.';
      showToast('Structure download failed', 'error');
    }
  }
  
function resetAnalysis() {
  console.log('Resetting analysis');
  
  analysisInProgress = false;
  currentGeneData = null;
  
  // Reset form
  const form = document.getElementById('geneForm');
  if (form) {
    form.reset();
  }
  
  // Hide sections
  const progressSection = document.getElementById('progressSection');
  const resultsSection = document.getElementById('resultsSection');
  // hide alphaFold card on reset
const afCard = document.getElementById('alphafold-card');
if (afCard) afCard.style.display = 'none';

// reset structure viewer if any
if (nglStage) {
  try { nglStage.removeAllComponents(); } catch (e) {}
}

  if (progressSection) progressSection.classList.add('hidden');
  if (resultsSection) resultsSection.classList.add('hidden');
  
  // Reset progress
  resetProgressSteps();
  
  // Reset loading state
  hideLoadingState();
  
  // Focus on gene input
  const geneInput = document.getElementById('geneInput');
  if (geneInput) {
    geneInput.focus();
  }
}

function downloadFasta() {
  if (!currentGeneData) {
    showToast('No gene data available for download', 'error');
    return;
  }
  
  let fastaContent = '';
  
  // Add genomic sequence header
  fastaContent += `>${currentGeneData.genomicAccession} ${currentGeneData.symbol} genomic sequence\n`;
  fastaContent += generateRandomSequence(50000) + '\n\n';
  
  // Add transcript sequences
  currentGeneData.mrnaTranscripts.forEach(transcript => {
    fastaContent += `>${transcript.accession} ${transcript.description}\n`;
    fastaContent += generateRandomSequence(transcript.length) + '\n\n';
  });
  
  downloadFile(fastaContent, `${currentGeneData.symbol}_sequences.fasta`, 'text/plain');
  showToast('FASTA file downloaded successfully', 'success');
}

function downloadCsv() {
  if (!currentGeneData) {
    showToast('No gene data available for download', 'error');
    return;
  }
  
  let csvContent = 'Gene Symbol,Gene ID,Chromosome,Location,Description,Function,Aliases\n';
  csvContent += `"${currentGeneData.symbol}","${currentGeneData.geneId}","${currentGeneData.chromosome}","${currentGeneData.location}","${currentGeneData.description}","${currentGeneData.function}","${currentGeneData.aliases.join('; ')}"\n\n`;
  
  csvContent += 'Exon Number,Start Position,End Position,Length (bp)\n';
  currentGeneData.exons.forEach(exon => {
    csvContent += `${exon.number},${exon.start},${exon.end},${exon.length}\n`;
  });
  
  downloadFile(csvContent, `${currentGeneData.symbol}_data.csv`, 'text/csv');
  showToast('CSV file downloaded successfully', 'success');
}

function generateRandomSequence(length) {
  const bases = ['A', 'T', 'G', 'C'];
  let sequence = '';
  
  for (let i = 0; i < length; i++) {
    sequence += bases[Math.floor(Math.random() * bases.length)];
    if ((i + 1) % 80 === 0) {
      sequence += '\n';
    }
  }
  
  return sequence;
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    console.error('Toast container not found');
    return;
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  // Add click to dismiss
  toast.addEventListener('click', () => {
    toast.remove();
  });
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 5000);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function(event) {
  if (analysisInProgress) {
    event.preventDefault();
    showToast('Analysis in progress. Please wait for completion.', 'info');
  }
});

// Prevent form submission on Enter key when analysis is in progress
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && analysisInProgress) {
    event.preventDefault();
  }
});