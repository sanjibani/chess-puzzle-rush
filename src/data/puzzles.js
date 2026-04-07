// Chess Puzzle Database
// Format: Each puzzle has:
//   id: unique identifier
//   fen: position where the player needs to move (player's turn)
//   moves: solution sequence [playerMove, computerResponse, playerMove, ...]
//          UCI notation (e.g., "e2e4", "g1f3")
//   rating: difficulty (Elo-like)
//   themes: array of tactical themes
//
// The player's color is determined by the FEN active color field.
// moves[0], moves[2], etc. are the player's moves (what they need to find)
// moves[1], moves[3], etc. are the computer's responses (played automatically)

const puzzles = [
  // ============================================
  // BEGINNER: Mate in 1 (Rating 400-800)
  // ============================================

  // Back rank mates
  {
    id: "m1_001",
    fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1",
    moves: ["a1a8"],
    rating: 400,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_002",
    fen: "6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1",
    moves: ["e1e8"],
    rating: 420,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_003",
    fen: "5k2/5ppp/8/8/8/8/8/3R2K1 w - - 0 1",
    moves: ["d1d8"],
    rating: 430,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_004",
    fen: "2r2rk1/5ppp/8/8/8/8/5PPP/R4RK1 w - - 0 1",
    moves: ["a1a8"],
    rating: 500,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_005",
    fen: "r5k1/5ppp/8/8/8/8/5PPP/R3R1K1 w - - 0 1",
    moves: ["e1e8"],
    rating: 520,
    themes: ["mateIn1", "backRankMate"],
  },

  // Queen mates
  {
    id: "m1_006",
    fen: "5rk1/ppp2p1p/8/6Q1/8/8/PPP2PPP/4K3 w - - 0 1",
    moves: ["g5g7"],
    rating: 450,
    themes: ["mateIn1"],
  },
  {
    id: "m1_007",
    fen: "5rk1/5pQp/8/8/8/8/5PPP/6K1 w - - 0 1",
    moves: ["g7h8"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "m1_008",
    fen: "r1bq1rk1/ppp2ppp/2n5/3Np3/2B5/8/PPPP1PPP/R1BQK2R w KQ - 0 8",
    moves: ["d1g4"],
    rating: 750,
    themes: ["mateIn1"],
  },
  {
    id: "m1_009",
    fen: "rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 3",
    moves: ["h4e1"],
    rating: 450,
    themes: ["mateIn1", "foolsMate"],
  },
  {
    id: "m1_010",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
    moves: ["h5f7"],
    rating: 500,
    themes: ["mateIn1", "scholarsMate"],
  },

  // Smothered mates
  {
    id: "m1_011",
    fen: "6rk/6pp/8/6N1/8/8/8/7K w - - 0 1",
    moves: ["g5f7"],
    rating: 700,
    themes: ["mateIn1", "smotheredMate"],
  },
  {
    id: "m1_012",
    fen: "5rkr/5ppp/8/5N2/8/8/8/6K1 w - - 0 1",
    moves: ["f5h6"],
    rating: 650,
    themes: ["mateIn1", "smotheredMate"],
  },

  // Bishop + Queen mates
  {
    id: "m1_018",
    fen: "r1bk2nr/pppp1Bpp/2n5/2b1p1q1/4P3/8/PPPP1PPP/RNBQK1NR w KQ - 0 1",
    moves: ["d1d7"],
    rating: 700,
    themes: ["mateIn1"],
  },

  // Knight + Queen mates
  {
    id: "m1_019",
    fen: "r1b1kb1r/pppp1ppp/5n2/4p1q1/2B1P1Q1/5N2/PPPP1PPP/RNB1K2R w KQkq - 0 1",
    moves: ["g4d7"],
    rating: 680,
    themes: ["mateIn1"],
  },

  // Pawn promotion mate
  {
    id: "m1_020",
    fen: "5k2/4P1pp/8/8/8/8/6PP/6K1 w - - 0 1",
    moves: ["e7e8q"],
    rating: 550,
    themes: ["mateIn1", "promotion"],
  },

  // More back rank mates with different setups
  {
    id: "m1_021",
    fen: "1r3rk1/5ppp/8/1Q6/8/8/5PPP/6K1 w - - 0 1",
    moves: ["b5b8"],
    rating: 500,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_022",
    fen: "3r1rk1/5ppp/8/8/8/8/Q4PPP/6K1 w - - 0 1",
    moves: ["a2a8"],
    rating: 520,
    themes: ["mateIn1", "backRankMate"],
  },

  // Double check / discovered check mates
  {
    id: "m1_023",
    fen: "rnb1k1nr/pppp1ppp/4p3/8/1bBPP3/2N2N2/PPP2PPP/R1BQK2R b KQkq - 0 1",
    moves: ["b4c3"],
    rating: 750,
    themes: ["mateIn1"],
  },

  // Black to move mates
  {
    id: "m1_025",
    fen: "6K1/5PPP/8/8/8/8/8/4r1k1 b - - 0 1",
    moves: ["e1e8"],
    rating: 500,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_026",
    fen: "4R1K1/5PPP/8/8/8/8/5ppp/r5k1 b - - 0 1",
    moves: ["a1a8"],
    rating: 520,
    themes: ["mateIn1", "backRankMate"],
  },

  // ============================================
  // BEGINNER-INTERMEDIATE: Mate in 2 (Rating 800-1300)
  // ============================================

  // Queen sacrifice + back rank mate
  {
    id: "m2_001",
    fen: "2r2rk1/5ppp/8/8/8/8/Q4PPP/4R1K1 w - - 0 1",
    moves: ["a2a8", "c8a8", "e1a1"],
    rating: 900,
    themes: ["mateIn2", "backRankMate", "sacrifice"],
  },
  {
    id: "m2_002",
    fen: "3r1rk1/5ppp/8/8/8/8/Q4PPP/R5K1 w - - 0 1",
    moves: ["a2a8", "d8a8", "a1a8"],
    rating: 950,
    themes: ["mateIn2", "backRankMate", "sacrifice"],
  },
  {
    id: "m2_003",
    fen: "1r3rk1/5ppp/8/8/8/8/4RPPP/1Q4K1 w - - 0 1",
    moves: ["b1b8", "f8b8", "e2e8"],
    rating: 920,
    themes: ["mateIn2", "backRankMate", "sacrifice"],
  },

  // Rook lift + mate
  {
    id: "m2_004",
    fen: "r4rk1/ppp2ppp/8/8/8/6R1/PPP2PPP/6K1 w - - 0 1",
    moves: ["g3g7", "g8h8", "g7a7"],
    rating: 1050,
    themes: ["mateIn2"],
  },

  // Double rook mates
  {
    id: "m2_005",
    fen: "6k1/5ppp/8/8/8/8/5PPP/RR4K1 w - - 0 1",
    moves: ["a1a8", "g8g8", "b1b8"],
    rating: 850,
    themes: ["mateIn2", "backRankMate"],
  },

  // Smothered mate pattern (Philidor's legacy)
  {
    id: "m2_006",
    fen: "r4rk1/5ppp/8/8/1N6/8/5PPP/R1Q3K1 w - - 0 1",
    moves: ["c1g5", "g8h8", "b4f5"],
    rating: 1200,
    themes: ["mateIn2"],
  },

  // Queen + Knight mate
  {
    id: "m2_007",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
    moves: ["d4e5", "f6e4", "d1d7"],
    rating: 1150,
    themes: ["mateIn2"],
  },

  // Black mate in 2
  {
    id: "m2_008",
    fen: "6K1/5PPP/8/8/8/8/q4ppp/4r1k1 b - - 0 1",
    moves: ["a2a8", "g8g8", "e1e8"],
    rating: 950,
    themes: ["mateIn2", "backRankMate"],
  },

  // Deflection + mate
  {
    id: "m2_009",
    fen: "r2q1rk1/ppp2ppp/8/3R4/8/8/PPP2PPP/4R1K1 w - - 0 1",
    moves: ["d5d8", "f8d8", "e1e8"],
    rating: 1000,
    themes: ["mateIn2", "backRankMate", "deflection"],
  },
  {
    id: "m2_010",
    fen: "r2q1rk1/ppp2ppp/8/4R3/8/8/PPP2PPP/3R2K1 w - - 0 1",
    moves: ["e5e8", "d8e8", "d1d8"],
    rating: 980,
    themes: ["mateIn2", "backRankMate", "deflection"],
  },

  // Arabian mate pattern
  {
    id: "m2_011",
    fen: "7k/R7/5N2/8/8/8/8/7K w - - 0 1",
    moves: ["a7h7", "h8g8", "f6e8"],
    rating: 850,
    themes: ["mateIn2", "arabianMate"],
  },

  // ============================================
  // INTERMEDIATE: Tactics (Rating 1000-1500)
  // ============================================

  // Knight forks
  {
    id: "t_001",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    moves: ["f3e5"],
    rating: 800,
    themes: ["fork", "hangingPiece"],
  },
  {
    id: "t_002",
    fen: "r2q1rk1/ppp2ppp/3b1n2/3Pp3/8/2N5/PPPB1PPP/R2QKB1R w KQ - 0 1",
    moves: ["d5d6"],
    rating: 1050,
    themes: ["fork", "pawnFork"],
  },
  {
    id: "t_003",
    fen: "r1bqkb1r/ppppnppp/8/4N3/8/8/PPPPPPPP/RNBQKB1R w KQkq - 0 1",
    moves: ["e5f7"],
    rating: 900,
    themes: ["fork", "knightFork"],
  },
  {
    id: "t_004",
    fen: "r2qk2r/ppp2ppp/2n5/3np3/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 1",
    moves: ["c4d5"],
    rating: 850,
    themes: ["hangingPiece", "capture"],
  },

  // Queen forks
  {
    id: "t_005",
    fen: "r1b1k2r/ppppqppp/2n5/4p3/2B1n3/8/PPPPQPPP/RNB1K2R w KQkq - 0 1",
    moves: ["e2e4"],
    rating: 1100,
    themes: ["fork", "capture"],
  },

  // Pins
  {
    id: "t_006",
    fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2",
    moves: ["e4d5", "d8d5", "d1d5"],
    rating: 700,
    themes: ["capture", "exchange"],
  },
  {
    id: "t_007",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    moves: ["f3e5"],
    rating: 950,
    themes: ["capture", "tactics"],
  },

  // Skewers
  {
    id: "t_008",
    fen: "8/8/8/8/8/k7/4r3/K3R3 w - - 0 1",
    moves: ["e1e2"],
    rating: 800,
    themes: ["skewer"],
  },
  {
    id: "t_009",
    fen: "8/8/8/3k4/8/8/8/R3K3 w - - 0 1",
    moves: ["a1a5"],
    rating: 850,
    themes: ["skewer", "check"],
  },

  // Discovered attacks
  {
    id: "t_010",
    fen: "r1bqkbnr/pppppppp/2n5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 3",
    moves: ["c6d4"],
    rating: 1000,
    themes: ["discoveredAttack", "fork"],
  },

  // Removing the defender
  {
    id: "t_011",
    fen: "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
    moves: ["c4f7"],
    rating: 1200,
    themes: ["sacrifice", "removingDefender"],
  },

  // Trapped pieces
  {
    id: "t_012",
    fen: "rnbqk1nr/pppp1ppp/8/2b1p3/4P3/2N3P1/PPPP1P1P/R1BQKBNR b KQkq - 0 1",
    moves: ["c5f2"],
    rating: 1100,
    themes: ["sacrifice", "attack"],
  },

  // ============================================
  // INTERMEDIATE-ADVANCED: Combinations (Rating 1300-1800)
  // ============================================

  // Greek gift sacrifice (Bxh7+)
  {
    id: "c_001",
    fen: "r1bq1rk1/ppppnppp/4p3/8/1bBP4/2N1BN2/PPP2PPP/R2QK2R w KQ - 0 1",
    moves: ["c4e6"],
    rating: 1350,
    themes: ["sacrifice", "attack"],
  },

  // Double bishop sacrifice
  {
    id: "c_002",
    fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 w - - 0 1",
    moves: ["c4f7", "f8f7", "f3g5"],
    rating: 1500,
    themes: ["sacrifice", "attack", "advantage"],
  },

  // Windmill pattern
  {
    id: "c_003",
    fen: "r1b2rk1/pp3ppp/2p5/8/3Nb3/8/PPP2PPP/R1B1R1K1 w - - 0 1",
    moves: ["e1e4"],
    rating: 1300,
    themes: ["capture", "advantage"],
  },

  // Clearance sacrifice
  {
    id: "c_004",
    fen: "r3r1k1/ppp2ppp/2n5/3q4/3P4/5N2/PPP2PPP/R2QR1K1 w - - 0 1",
    moves: ["e1e8", "a8e8", "d1d5"],
    rating: 1400,
    themes: ["sacrifice", "exchange", "advantage"],
  },

  // Interference
  {
    id: "c_005",
    fen: "r3k2r/ppp2ppp/2n5/3qp3/3P4/2P2N2/PP3PPP/R2QR1K1 w kq - 0 1",
    moves: ["d4e5", "d5d1", "e1d1"],
    rating: 1350,
    themes: ["exchange", "advantage"],
  },

  // Overloaded piece
  {
    id: "c_006",
    fen: "r2qr1k1/ppp2ppp/2n5/3p4/3Pn3/2PB1N2/PP3PPP/R2Q1RK1 w - - 0 1",
    moves: ["d3e4", "d5e4", "f3e5"],
    rating: 1450,
    themes: ["overloadedPiece", "advantage"],
  },

  // Decoy
  {
    id: "c_007",
    fen: "r2qkb1r/pp2pppp/2p2n2/3p4/3Pn1b1/2N1BN2/PPP1BPPP/R2QK2R w KQkq - 0 1",
    moves: ["f3e5"],
    rating: 1250,
    themes: ["capture", "tactics"],
  },

  // ============================================
  // ADVANCED: Complex tactics (Rating 1600-2200)
  // ============================================

  // Deep sacrifice combinations
  {
    id: "a_001",
    fen: "r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 1",
    moves: ["c3d5", "e6d5", "f3e5"],
    rating: 1650,
    themes: ["sacrifice", "centralControl", "advantage"],
  },
  {
    id: "a_002",
    fen: "r2q1rk1/pb2bppp/1pn1pn2/2p5/2PP4/1PB1PN2/P4PPP/RN1Q1RK1 w - - 0 1",
    moves: ["d4c5", "b6c5", "d1d6"],
    rating: 1700,
    themes: ["sacrifice", "advantage"],
  },

  // Quiet move puzzles
  {
    id: "a_003",
    fen: "r1b2rk1/pp3ppp/2n1pn2/q1pp4/2PP4/P1N1PN2/1P3PPP/R1BQ1RK1 w - - 0 1",
    moves: ["c4d5", "c6d4", "d5e6"],
    rating: 1750,
    themes: ["pawnBreak", "advantage"],
  },

  // Positional sacrifices
  {
    id: "a_004",
    fen: "r1bq1rk1/ppp1nppp/3p1n2/4p3/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQ - 0 1",
    moves: ["d4d5", "f6e4", "c3e4"],
    rating: 1800,
    themes: ["pawnBreak", "capture", "advantage"],
  },

  // Endgame tactics
  {
    id: "a_005",
    fen: "8/8/8/3k4/8/2K5/5P2/8 w - - 0 1",
    moves: ["f2f4"],
    rating: 1600,
    themes: ["endgame", "pawnEndgame"],
  },
  {
    id: "a_006",
    fen: "8/5p2/8/5k2/8/5K2/5P2/8 w - - 0 1",
    moves: ["f3e3"],
    rating: 1650,
    themes: ["endgame", "pawnEndgame", "opposition"],
  },

  // Rook endgames
  {
    id: "a_007",
    fen: "8/8/8/8/k1K5/8/P7/R7 w - - 0 1",
    moves: ["a1a3"],
    rating: 1600,
    themes: ["endgame", "rookEndgame"],
  },

  // ============================================
  // EXPERT: Master-level (Rating 2000+)
  // ============================================

  // Complex combinations
  {
    id: "e_001",
    fen: "r2qr1k1/pp1n1ppp/2p1pn2/3p4/1b1P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 1",
    moves: ["c3d5", "c6d5", "f3e5"],
    rating: 2000,
    themes: ["sacrifice", "centralControl"],
  },
  {
    id: "e_002",
    fen: "r1b1r1k1/pp2qppp/2n1pn2/3p4/1b1P4/1PNBPN2/P4PPP/R1BQ1RK1 w - - 0 1",
    moves: ["c3d5", "e6d5", "d3h7"],
    rating: 2100,
    themes: ["sacrifice", "greekGift", "attack"],
  },

  // Zugzwang
  {
    id: "e_003",
    fen: "8/8/1p6/1Pk5/1pK5/1P6/8/8 w - - 0 1",
    moves: ["c4d3"],
    rating: 2050,
    themes: ["endgame", "zugzwang"],
  },

  // Study-like positions
  {
    id: "e_004",
    fen: "8/8/8/1Kp5/8/8/1PP5/k7 w - - 0 1",
    moves: ["c2c4"],
    rating: 2200,
    themes: ["endgame", "pawnEndgame"],
  },

  // ============================================
  // MORE MATE IN 1 (different patterns)
  // ============================================
  {
    id: "m1_030",
    fen: "r1bqk2r/pppp1Qpp/2n2n2/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
    moves: ["f7f8"],
    rating: 600,
    themes: ["mateIn1"],
  },
  {
    id: "m1_031",
    fen: "rnb1k1nr/pppp1ppp/8/4p3/2B1P2q/5P2/PPPP2PP/RNBQK1NR b KQkq - 0 1",
    moves: ["h4h1"],
    rating: 500,
    themes: ["mateIn1"],
  },
  {
    id: "m1_032",
    fen: "k7/pp6/8/8/8/8/1K6/R7 w - - 0 1",
    moves: ["a1a8"],
    rating: 450,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_033",
    fen: "5k2/R7/5K2/8/8/8/8/8 w - - 0 1",
    moves: ["a7a8"],
    rating: 500,
    themes: ["mateIn1"],
  },
  {
    id: "m1_034",
    fen: "k7/1p6/1K6/8/8/8/8/R7 w - - 0 1",
    moves: ["a1a8"],
    rating: 420,
    themes: ["mateIn1"],
  },
  {
    id: "m1_035",
    fen: "8/pk6/2p5/1pP5/1P2K3/8/8/Q7 w - - 0 1",
    moves: ["a1a7"],
    rating: 600,
    themes: ["mateIn1"],
  },
  {
    id: "m1_036",
    fen: "6k1/5p1p/6p1/8/8/8/5PPP/4Q1K1 w - - 0 1",
    moves: ["e1e8"],
    rating: 500,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_037",
    fen: "r5k1/pppb1ppp/8/8/8/8/PPPB1PPP/4R1K1 w - - 0 1",
    moves: ["e1e8"],
    rating: 600,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_038",
    fen: "2k5/ppp5/8/8/8/8/PPP5/1K1R4 w - - 0 1",
    moves: ["d1d8"],
    rating: 440,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_039",
    fen: "5r1k/6pp/8/8/8/8/6PP/5RK1 w - - 0 1",
    moves: ["f1f8"],
    rating: 480,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "m1_040",
    fen: "7k/5Qpp/8/8/8/8/6PP/6K1 w - - 0 1",
    moves: ["f7g8"],
    rating: 400,
    themes: ["mateIn1"],
  },

  // ============================================
  // MORE INTERMEDIATE TACTICS
  // ============================================

  // Pin exploitations
  {
    id: "t_023",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
    moves: ["e5d4", "f3d4", "f6e4"],
    rating: 1100,
    themes: ["capture", "pawnBreak"],
  },

  // More complex captures
  {
    id: "t_030",
    fen: "r2qk2r/ppp1bppp/2n1bn2/3pp3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 w kq - 0 1",
    moves: ["e4d5", "e6d5", "c4d5"],
    rating: 1200,
    themes: ["capture", "pawnBreak"],
  },

  // ============================================
  // MORE MATE IN 2 PUZZLES
  // ============================================
  {
    id: "m2_020",
    fen: "r1bq1rk1/ppp2ppp/2n5/3Np3/2B5/8/PPPP1PPP/R1BQK2R w KQ - 0 1",
    moves: ["d1g4", "g8h8", "g4g7"],
    rating: 1100,
    themes: ["mateIn2", "attack"],
  },
  {
    id: "m2_021",
    fen: "r1b2rk1/ppppqppp/2n5/4N3/2B5/8/PPPP1PPP/R1BQR1K1 w - - 0 1",
    moves: ["e5f7", "f8f7", "e1e7"],
    rating: 1150,
    themes: ["mateIn2", "sacrifice"],
  },
  {
    id: "m2_022",
    fen: "5rk1/pp4pp/8/8/1B6/8/PP3PPP/4R1K1 w - - 0 1",
    moves: ["e1e8", "f8e8", "b4e7"],
    rating: 1000,
    themes: ["mateIn2", "backRankMate"],
  },
  {
    id: "m2_023",
    fen: "6k1/5p1p/6p1/8/8/5B2/5PPP/4R1K1 w - - 0 1",
    moves: ["f3c6", "g8f8", "e1e8"],
    rating: 1200,
    themes: ["mateIn2"],
  },
  {
    id: "m2_024",
    fen: "r4rk1/5ppp/8/8/8/8/5PPP/RR4K1 w - - 0 1",
    moves: ["b1b8", "a8b8", "a1a8"],
    rating: 950,
    themes: ["mateIn2", "backRankMate", "sacrifice"],
  },

  // ============================================
  // PATTERN RECOGNITION PUZZLES
  // ============================================

  // Anastasia's mate setup
  {
    id: "p_001",
    fen: "4rrk1/5Npp/8/8/8/8/5PPP/R5K1 w - - 0 1",
    moves: ["f7h6", "g8h8", "a1a8"],
    rating: 1400,
    themes: ["mateIn2", "knightAttack"],
  },

  // Legal's mate pattern
  {
    id: "p_002",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 3",
    moves: ["f3e5"],
    rating: 900,
    themes: ["sacrifice", "attack"],
  },

  // Damiano's mate
  {
    id: "p_003",
    fen: "5rk1/5p1p/8/8/8/8/4QPPP/6K1 w - - 0 1",
    moves: ["e2e8"],
    rating: 600,
    themes: ["mateIn1", "backRankMate"],
  },

  // Opera game style
  {
    id: "p_004",
    fen: "rn2kb1r/p1q1pppp/1pp2n2/3p4/3P1Bb1/2NBPN2/PPP2PPP/R2QK2R w KQkq - 0 1",
    moves: ["f4g5"],
    rating: 1100,
    themes: ["pin", "advantage"],
  },

  // ============================================
  // ENDGAME PUZZLES
  // ============================================

  // King and pawn
  {
    id: "eg_001",
    fen: "8/8/8/8/4k3/8/4P3/4K3 w - - 0 1",
    moves: ["e1d2"],
    rating: 1400,
    themes: ["endgame", "pawnEndgame"],
  },
  {
    id: "eg_002",
    fen: "8/8/4k3/8/4P3/4K3/8/8 w - - 0 1",
    moves: ["e3d4"],
    rating: 1300,
    themes: ["endgame", "pawnEndgame", "opposition"],
  },
  {
    id: "eg_003",
    fen: "8/4k3/8/4P3/4K3/8/8/8 w - - 0 1",
    moves: ["e4d5"],
    rating: 1350,
    themes: ["endgame", "pawnEndgame", "opposition"],
  },
  {
    id: "eg_004",
    fen: "8/8/8/4k3/4P3/4K3/8/8 b - - 0 1",
    moves: ["e5e6"],
    rating: 1300,
    themes: ["endgame", "pawnEndgame", "opposition"],
  },

  // Rook vs pawn
  {
    id: "eg_005",
    fen: "8/3P4/8/8/8/k7/8/1K2r3 w - - 0 1",
    moves: ["d7d8q", "e1d1", "d8d1"],
    rating: 1500,
    themes: ["endgame", "promotion", "advantage"],
  },

  // Knight + King mate (educational)
  {
    id: "eg_006",
    fen: "8/8/8/8/8/1k6/8/K1Q5 w - - 0 1",
    moves: ["c1b2"],
    rating: 500,
    themes: ["mateIn1"],
  },

  // ============================================
  // ADDITIONAL PUZZLES FOR VARIETY
  // ============================================

  // Intermediate mates
  {
    id: "v_001",
    fen: "r3k2r/8/8/8/8/8/8/4K2R w Kkq - 0 1",
    moves: ["h1h8"],
    rating: 650,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "v_002",
    fen: "rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 1",
    moves: ["h4e1"],
    rating: 500,
    themes: ["mateIn1", "foolsMate"],
  },
  {
    id: "v_003",
    fen: "r3kbnr/ppp1pppp/2n5/3q4/8/2N5/PPPP1PPP/R1BQKBNR w KQkq - 0 1",
    moves: ["c3d5"],
    rating: 800,
    themes: ["capture", "centralControl"],
  },
  {
    id: "v_004",
    fen: "1rbqkbnr/pppppppp/2n5/8/2B5/4PN2/PPPP1PPP/RNBQK2R w KQk - 3 3",
    moves: ["c4f7"],
    rating: 1050,
    themes: ["sacrifice", "attack"],
  },

  // More advanced combinations
  {
    id: "v_007",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq d3 0 4",
    moves: ["e5d4"],
    rating: 1000,
    themes: ["capture", "opening"],
  },
  {
    id: "v_008",
    fen: "r1b1kbnr/pppp1ppp/2n5/4p3/4PP1q/6P1/PPPP3P/RNBQKBNR b KQkq - 0 1",
    moves: ["h4e1"],
    rating: 550,
    themes: ["mateIn1"],
  },

  // Trapped piece puzzles
  {
    id: "v_009",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 1",
    moves: ["d1h5"],
    rating: 800,
    themes: ["attack", "threat"],
  },
  {
    id: "v_010",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 2",
    moves: ["f3e5"],
    rating: 700,
    themes: ["capture"],
  },

  // Zwischenzug (intermediate move)
  {
    id: "v_011",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4",
    moves: ["f6e4"],
    rating: 1100,
    themes: ["capture", "tactics"],
  },

  // More endgame puzzles
  {
    id: "v_012",
    fen: "8/8/8/8/8/k1K5/8/1R6 w - - 0 1",
    moves: ["b1a1"],
    rating: 600,
    themes: ["mateIn1"],
  },
  {
    id: "v_013",
    fen: "8/8/8/8/8/K1k5/1R6/8 w - - 0 1",
    moves: ["b2c2"],
    rating: 550,
    themes: ["mateIn1"],
  },
  {
    id: "v_014",
    fen: "k7/2K5/8/8/8/8/8/1R6 w - - 0 1",
    moves: ["b1a1"],
    rating: 450,
    themes: ["mateIn1"],
  },

  // Queen + pawn endgames
  {
    id: "v_015",
    fen: "8/8/8/8/8/k1K5/8/1Q6 w - - 0 1",
    moves: ["c3b4"],
    rating: 900,
    themes: ["endgame", "mateIn2"],
  },

  // Rook sacrifice patterns
  {
    id: "v_016",
    fen: "1r4k1/5ppp/8/8/8/8/5PPP/1R2R1K1 w - - 0 1",
    moves: ["e1e8", "b8e8", "b1b8"],
    rating: 950,
    themes: ["mateIn2", "backRankMate", "sacrifice"],
  },

  // More variety - different openings leading to tactics
  {
    id: "v_017",
    fen: "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4",
    moves: ["c4d5", "c6d5", "c3d5"],
    rating: 900,
    themes: ["capture", "pawnBreak"],
  },
  {
    id: "v_018",
    fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2",
    moves: ["d5c4"],
    rating: 750,
    themes: ["capture"],
  },

  // More pattern recognition
  {
    id: "v_019",
    fen: "r1bq1rk1/ppppbppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 6",
    moves: ["c4f7"],
    rating: 1300,
    themes: ["sacrifice", "attack"],
  },

  // ============================================
  // ADDITIONAL EASY PUZZLES (for beginners)
  // ============================================
  {
    id: "ez_001",
    fen: "8/8/8/8/8/Q1K5/8/k7 w - - 0 1",
    moves: ["a3a2"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "ez_002",
    fen: "8/8/8/8/8/1QK5/8/1k6 w - - 0 1",
    moves: ["b3b2"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "ez_003",
    fen: "k7/8/KQ6/8/8/8/8/8 w - - 0 1",
    moves: ["b6a7"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "ez_004",
    fen: "1k6/8/1KQ5/8/8/8/8/8 w - - 0 1",
    moves: ["c6a8"],
    rating: 420,
    themes: ["mateIn1"],
  },
  {
    id: "ez_005",
    fen: "k7/8/1K6/8/8/8/8/R7 w - - 0 1",
    moves: ["a1a8"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "ez_006",
    fen: "k7/2K5/8/8/8/8/8/R7 w - - 0 1",
    moves: ["a1a8"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "ez_007",
    fen: "7k/5K2/8/8/8/8/8/7R w - - 0 1",
    moves: ["h1h8"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "ez_008",
    fen: "7k/6K1/8/8/8/8/8/7R w - - 0 1",
    moves: ["h1h8"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "ez_009",
    fen: "k1K5/8/8/8/8/8/1R6/8 w - - 0 1",
    moves: ["b2a2"],
    rating: 430,
    themes: ["mateIn1"],
  },
  {
    id: "ez_010",
    fen: "k1K5/1R6/8/8/8/8/8/8 w - - 0 1",
    moves: ["b7a7"],
    rating: 400,
    themes: ["mateIn1"],
  },

  // ============================================
  // MIXED DIFFICULTY
  // ============================================
  {
    id: "mx_001",
    fen: "3qk3/8/8/8/8/8/8/3QK3 w - - 0 1",
    moves: ["d1d8"],
    rating: 500,
    themes: ["capture"],
  },
  {
    id: "mx_002",
    fen: "4k3/8/8/8/4n3/8/8/4RK2 w - - 0 1",
    moves: ["e1e4"],
    rating: 600,
    themes: ["capture"],
  },
  {
    id: "mx_003",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R b KQkq - 0 3",
    moves: ["c6e5"],
    rating: 700,
    themes: ["capture", "recapture"],
  },

  // ============================================
  // ADDITIONAL MATE IN 1 - BLACK TO PLAY
  // ============================================
  {
    id: "bm_001",
    fen: "R5K1/5PPP/8/8/8/8/8/r5k1 b - - 0 1",
    moves: ["a1a8"],
    rating: 500,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "bm_002",
    fen: "4R1K1/5PPP/8/8/8/8/5ppp/4r1k1 b - - 0 1",
    moves: ["e1e8"],
    rating: 520,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "bm_003",
    fen: "7K/6PP/8/8/8/8/8/5rk1 b - - 0 1",
    moves: ["f1f8"],
    rating: 480,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "bm_004",
    fen: "6K1/5PP1/8/8/8/8/6q1/6k1 b - - 0 1",
    moves: ["g2g7"],
    rating: 500,
    themes: ["mateIn1"],
  },
  {
    id: "bm_005",
    fen: "6K1/5PPP/8/8/8/8/8/4q1k1 b - - 0 1",
    moves: ["e1e8"],
    rating: 500,
    themes: ["mateIn1", "backRankMate"],
  },

  // ============================================
  // MORE MATE IN 2 - VARIED PATTERNS
  // ============================================
  {
    id: "m2_030",
    fen: "6k1/5ppp/8/8/8/5B2/5PPP/RR4K1 w - - 0 1",
    moves: ["b1b8", "a8b8", "a1a8"],
    rating: 1000,
    themes: ["mateIn2", "backRankMate"],
  },
  {
    id: "m2_031",
    fen: "3rkr2/8/8/8/8/8/8/4RK2 w - - 0 1",
    moves: ["e1e8", "f8e8", "f1e2"],
    rating: 900,
    themes: ["mateIn2", "backRankMate"],
  },
  {
    id: "m2_032",
    fen: "r1b2rk1/pppp1ppp/2n5/4P3/2B5/8/PPP2PPP/R3R1K1 w - - 0 1",
    moves: ["c4f7", "f8f7", "e1e8"],
    rating: 1150,
    themes: ["mateIn2", "sacrifice"],
  },

  // ============================================
  // INTERESTING MIDDLEGAME PUZZLES
  // ============================================
  {
    id: "mg_001",
    fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7",
    moves: ["d4e5", "d6e5", "c4f7"],
    rating: 1400,
    themes: ["sacrifice", "attack"],
  },
  {
    id: "mg_002",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/4P3/2NP1N2/PPP2PPP/R1BQKB1R w KQkq - 0 5",
    moves: ["c1g5"],
    rating: 1000,
    themes: ["pin", "tactics"],
  },

  // ============================================
  // ADDITIONAL PUZZLES TO REACH 200+
  // ============================================

  // More easy mates
  {
    id: "add_001",
    fen: "8/8/8/8/Q7/1K6/8/k7 w - - 0 1",
    moves: ["a4a1"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "add_002",
    fen: "k7/8/1K6/Q7/8/8/8/8 w - - 0 1",
    moves: ["a5a7"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "add_003",
    fen: "k7/8/1K6/8/8/8/Q7/8 w - - 0 1",
    moves: ["a2a7"],
    rating: 420,
    themes: ["mateIn1"],
  },
  {
    id: "add_004",
    fen: "8/8/1k6/8/8/1K6/R7/8 w - - 0 1",
    moves: ["a2a6"],
    rating: 500,
    themes: ["mateIn1"],
  },
  {
    id: "add_005",
    fen: "1k6/1P6/1K6/8/8/8/8/8 w - - 0 1",
    moves: ["b7b8q"],
    rating: 550,
    themes: ["mateIn1", "promotion"],
  },
  {
    id: "add_006",
    fen: "8/8/1k6/8/1K6/8/8/R7 w - - 0 1",
    moves: ["a1a6"],
    rating: 480,
    themes: ["mateIn1"],
  },
  {
    id: "add_007",
    fen: "6k1/R7/6K1/8/8/8/8/8 w - - 0 1",
    moves: ["a7a8"],
    rating: 450,
    themes: ["mateIn1"],
  },
  {
    id: "add_008",
    fen: "k7/R1K5/8/8/8/8/8/8 w - - 0 1",
    moves: ["a7a8"],
    rating: 400,
    themes: ["mateIn1"],
  },
  {
    id: "add_009",
    fen: "8/8/8/8/8/k7/8/KR6 w - - 0 1",
    moves: ["b1b3"],
    rating: 480,
    themes: ["mateIn1"],
  },
  {
    id: "add_010",
    fen: "8/8/8/8/8/K7/1R6/k7 w - - 0 1",
    moves: ["b2b1"],
    rating: 480,
    themes: ["mateIn1"],
  },

  // More mate patterns
  {
    id: "add_021",
    fen: "6k1/ppp2ppp/8/8/8/8/PPP1QPPP/6K1 w - - 0 1",
    moves: ["e2e8"],
    rating: 500,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "add_022",
    fen: "6k1/ppp2ppp/8/8/4Q3/8/PPP2PPP/6K1 w - - 0 1",
    moves: ["e4e8"],
    rating: 520,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "add_023",
    fen: "r5k1/ppp2ppp/8/8/4R3/8/PPP2PPP/6K1 w - - 0 1",
    moves: ["e4e8"],
    rating: 550,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "add_024",
    fen: "6k1/ppp1rppp/8/8/8/8/PPP2PPP/4R1K1 w - - 0 1",
    moves: ["e1e7"],
    rating: 700,
    themes: ["capture", "advantage"],
  },

  // Knight fork puzzles
  {
    id: "add_025",
    fen: "r3k3/8/8/8/3N4/8/8/4K3 w - - 0 1",
    moves: ["d4c6"],
    rating: 800,
    themes: ["fork", "knightFork"],
  },
  {
    id: "add_026",
    fen: "r1b1k3/8/8/8/4N3/8/8/4K3 w - - 0 1",
    moves: ["e4d6"],
    rating: 780,
    themes: ["fork", "knightFork"],
  },

  // Queen maneuver puzzles
  {
    id: "add_027",
    fen: "r1bqkbnr/1ppppppp/p1n5/8/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
    moves: ["c4f7"],
    rating: 1100,
    themes: ["sacrifice", "attack"],
  },

  // Two rooks cooperation
  {
    id: "add_028",
    fen: "6k1/5ppp/8/8/8/8/5PPP/1RR3K1 w - - 0 1",
    moves: ["c1c8"],
    rating: 550,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "add_029",
    fen: "1r4k1/5ppp/8/8/8/8/5PPP/R1R3K1 w - - 0 1",
    moves: ["c1c8"],
    rating: 600,
    themes: ["mateIn1", "backRankMate"],
  },
  {
    id: "add_030",
    fen: "r5k1/5ppp/8/8/8/8/5PPP/RR4K1 w - - 0 1",
    moves: ["b1b8"],
    rating: 580,
    themes: ["mateIn1", "backRankMate"],
  },

];

// Theme descriptions for display
export const themeDescriptions = {
  mateIn1: "Mate in 1",
  mateIn2: "Mate in 2",
  mateIn3: "Mate in 3",
  backRankMate: "Back Rank Mate",
  smotheredMate: "Smothered Mate",
  arabianMate: "Arabian Mate",
  foolsMate: "Fool's Mate",
  scholarsMate: "Scholar's Mate",
  fork: "Fork",
  knightFork: "Knight Fork",
  pawnFork: "Pawn Fork",
  pin: "Pin",
  skewer: "Skewer",
  discoveredAttack: "Discovered Attack",
  sacrifice: "Sacrifice",
  greekGift: "Greek Gift",
  deflection: "Deflection",
  overloadedPiece: "Overloaded Piece",
  removingDefender: "Removing the Defender",
  hangingPiece: "Hanging Piece",
  capture: "Capture",
  exchange: "Exchange",
  recapture: "Recapture",
  attack: "Attack",
  defense: "Defense",
  counterattack: "Counterattack",
  counterplay: "Counterplay",
  promotion: "Promotion",
  endgame: "Endgame",
  pawnEndgame: "Pawn Endgame",
  rookEndgame: "Rook Endgame",
  opposition: "Opposition",
  zugzwang: "Zugzwang",
  opening: "Opening",
  development: "Development",
  centerControl: "Center Control",
  centralControl: "Central Control",
  spaceAdvantage: "Space Advantage",
  pawnBreak: "Pawn Break",
  pawnPush: "Pawn Push",
  pawnCenter: "Pawn Center",
  check: "Check",
  knightAttack: "Knight Attack",
  tactics: "Tactics",
  advantage: "Advantage",
  threat: "Threat",
  middlegame: "Middlegame",
};

// Difficulty level definitions
export const difficultyLevels = [
  { name: "Beginner", min: 0, max: 800, color: "#4ade80" },
  { name: "Intermediate", min: 800, max: 1300, color: "#fbbf24" },
  { name: "Advanced", min: 1300, max: 1800, color: "#f97316" },
  { name: "Expert", min: 1800, max: 3000, color: "#ef4444" },
];

export default puzzles;
